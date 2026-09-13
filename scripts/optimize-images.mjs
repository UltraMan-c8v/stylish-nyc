/**
 * Converts the generated 2K PNGs into web-sized WebP.
 *
 * The generator returns ~5MB PNGs. Shipping those would put LCP well past the
 * 2.5s budget, so each image is resized to the largest width it is actually
 * rendered at (times a small allowance for 2x displays) and re-encoded.
 *
 * Run: node scripts/optimize-images.mjs
 * Source PNGs are archived to _source-images/ and are never served.
 */
import { readdir, mkdir, rename, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const IMG_DIR = path.resolve('public/img')

/**
 * Originals live outside public/, not in a subfolder of it. Vite copies the
 * whole of public/ into dist verbatim, so an archive kept under public/img/src
 * ships roughly 100MB of unreferenced 2K source files with every deploy. They
 * cost nothing at page load, because nothing links to them, and everything at
 * upload.
 */
const SRC_DIR = path.resolve('_source-images')

/** Rendered width in CSS px at the largest breakpoint, doubled for retina. */
const WIDTHS = {
  'hero-portrait': 1500,
  'salon-interior': 2000,
  'chair-mirror': 2000,
  'work-bob': 1100,
  'work-sectioning': 1100,
  'work-movement': 1100,
  'work-curls': 1100,
  'service-cut': 1400,
  'service-curl': 1400,
  'service-gloss': 1400,
  'service-treatment': 1200,
  'stylist-roman': 900,
  'stylist-roman-alt': 900,
  'stylist-a': 900,
  'stylist-b': 900,
  'stylist-c': 900,
}

const QUALITY = 80

async function main() {
  await mkdir(SRC_DIR, { recursive: true })

  const entries = (await readdir(IMG_DIR)).filter((f) => f.endsWith('.png'))
  if (entries.length === 0) {
    console.log('No PNGs left in public/img. Nothing to do.')
    return
  }

  let before = 0
  let after = 0

  for (const file of entries) {
    const name = path.basename(file, '.png')
    const from = path.join(IMG_DIR, file)
    const to = path.join(IMG_DIR, `${name}.webp`)
    const width = WIDTHS[name]

    if (!width) {
      console.warn(`! ${name}: no width configured, skipping`)
      continue
    }

    before += (await stat(from)).size

    const image = sharp(from)
    const meta = await image.metadata()
    const target = Math.min(width, meta.width ?? width)

    await image
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(to)

    const size = (await stat(to)).size
    after += size

    // Keep the original out of the served directory rather than deleting it.
    const archived = path.join(SRC_DIR, file)
    if (!existsSync(archived)) await rename(from, archived)

    console.log(
      `  ${name.padEnd(18)} ${target}px  ${(size / 1024).toFixed(0)}kb`,
    )
  }

  console.log(
    `\n${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB ` +
      `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
