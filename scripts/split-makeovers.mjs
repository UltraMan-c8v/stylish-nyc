/**
 * Splits the salon's before/after diptychs into two files each.
 *
 * The source images are a single JPEG carrying both halves with a white gutter
 * painted down the middle. That gutter is the problem: it is a bright vertical
 * bar baked into the pixels, and on a black page it reads as a scratch through
 * the picture. Cutting the pair apart lets the layout supply its own gap in
 * the page's own colour, and lets each half be labelled.
 *
 * The gutter is found rather than assumed. It sits near the centre but not
 * exactly on it in every file, so the script scans a band around the midpoint
 * for the run of columns whose mean luminance is highest and whose variance is
 * lowest, which is what a flat white bar looks like and what a photograph
 * never does.
 *
 *   node scripts/split-makeovers.mjs
 *
 * Reads public/img/incoming/raw-*.jpeg, writes makeover-NN-before/after.webp.
 */
import { readdir, rename, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const IN = path.resolve('public/img/incoming')
const OUT = path.resolve('public/img')
const DONE = path.resolve('_source-images')

const WIDTH = 700
const QUALITY = 82
/** How far either side of the midpoint to look for the gutter, as a fraction. */
const SEARCH = 0.06

async function findGutter(file, width, height) {
  // One row of statistics per column, taken from a grey copy at full width.
  const { data } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true })

  const lo = Math.floor(width * (0.5 - SEARCH))
  const hi = Math.ceil(width * (0.5 + SEARCH))
  const sampleRows = 40
  const stepY = Math.max(1, Math.floor(height / sampleRows))

  let best = { x: Math.floor(width / 2), score: -Infinity }

  for (let x = lo; x < hi; x++) {
    let sum = 0
    let sumSq = 0
    let n = 0
    for (let y = 0; y < height; y += stepY) {
      const v = data[y * width + x]
      sum += v
      sumSq += v * v
      n++
    }
    const mean = sum / n
    const variance = sumSq / n - mean * mean
    // Bright and flat. Variance is divided in rather than subtracted so a
    // moderately bright but textured column (a grey studio backdrop) cannot
    // outscore a genuinely uniform white bar.
    const score = mean / (1 + Math.sqrt(variance))
    if (score > best.score) best = { x, score }
  }

  // Walk outward from the peak while columns stay close to it in brightness,
  // which gives the full width of the bar rather than just its centre.
  let left = best.x
  let right = best.x
  const bright = (x) => {
    let sum = 0
    for (let y = 0; y < height; y += stepY) sum += data[y * width + x]
    return sum / Math.ceil(height / stepY)
  }
  const peak = bright(best.x)
  while (left > 0 && bright(left - 1) > peak - 12) left--
  while (right < width - 1 && bright(right + 1) > peak - 12) right++

  return { left, right }
}

async function main() {
  await mkdir(DONE, { recursive: true })
  const files = (await readdir(IN)).filter((f) => /^raw-\d+\.jpe?g$/i.test(f)).sort()

  if (files.length === 0) {
    console.log('Nothing to split. Put the raw-NN.jpeg diptychs in public/img/incoming.')
    return
  }

  const rows = []

  for (const file of files) {
    const n = file.match(/\d+/)[0]
    const from = path.join(IN, file)
    const { width, height } = await sharp(from).metadata()
    const { left, right } = await findGutter(from, width, height)

    const halves = [
      { name: `makeover-${n}-before`, x: 0, w: left },
      { name: `makeover-${n}-after`, x: right + 1, w: width - right - 1 },
    ]

    for (const h of halves) {
      await sharp(from)
        .extract({ left: h.x, top: 0, width: h.w, height })
        .resize({ width: Math.min(WIDTH, h.w), withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(path.join(OUT, `${h.name}.webp`))
    }

    await rename(from, path.join(DONE, file))
    rows.push({ n, gutter: `${left}-${right}`, halfWidth: left })
    console.log(`  makeover-${n}  gutter ${left}-${right} of ${width}`)
  }

  console.log('\nPaste into src/data/content.ts:\n')
  for (const r of rows) {
    console.log(
      `  { before: '/img/makeover-${r.n}-before.webp', after: '/img/makeover-${r.n}-after.webp', caption: 'TODO', note: 'TODO' },`,
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
