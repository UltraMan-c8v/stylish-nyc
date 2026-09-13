/**
 * Imports Roman's own photographs into the gallery.
 *
 * Drop any number of files (jpg, png, webp) into public/img/incoming, then:
 *
 *   node scripts/import-gallery.mjs
 *
 * Colour is preserved. The gallery desaturates in CSS and restores the real
 * colour on hover, so the shipped file has to carry it; baking greyscale here
 * (which an earlier version of this script did) would make that impossible.
 *
 * No crop either. The grid is CSS columns, so every photograph keeps its own
 * aspect ratio and nothing gets a head cut off to reach a common 3:4.
 *
 * `.rotate()` with no argument applies the EXIF orientation tag. Phone photos
 * are almost always stored landscape with a rotate flag, so without this a
 * portrait shot imports on its side.
 *
 * It prints a ready-made array to paste into src/data/content.ts. The alt text
 * and captions come out as stubs: write real ones, they are what a screen
 * reader and Google Images both read.
 */
import { readdir, mkdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const IN = path.resolve('public/img/incoming')
const OUT = path.resolve('public/img')
/** Outside public/, so originals are archived rather than deployed. */
const DONE = path.resolve('_source-images')

const WIDTH = 1200
const QUALITY = 82

async function main() {
  await mkdir(IN, { recursive: true })
  await mkdir(DONE, { recursive: true })

  const files = (await readdir(IN)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))

  if (files.length === 0) {
    console.log(`Nothing in ${path.relative(process.cwd(), IN)}. Drop the photos there first.`)
    return
  }

  const rows = []

  for (const file of files.sort()) {
    const name = path.basename(file, path.extname(file))
    const from = path.join(IN, file)
    const to = path.join(OUT, `${name}.webp`)

    const meta = await sharp(from).rotate().metadata()

    await sharp(from)
      .rotate()
      .resize({ width: Math.min(WIDTH, meta.width), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(to)

    const size = (await stat(to)).size
    await rename(from, path.join(DONE, file))

    rows.push({ name, w: meta.width, h: meta.height })
    console.log(`  ${name.padEnd(26)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)}kb`)
  }

  console.log('\nPaste into src/data/content.ts:\n')
  for (const r of rows) {
    console.log(
      `  { src: '/img/${r.name}.webp', alt: 'TODO', caption: 'TODO', note: 'TODO' },`,
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
