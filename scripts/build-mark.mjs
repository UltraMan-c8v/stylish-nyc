/**
 * Turns the raster logo mark into a real vector asset plus a favicon set.
 *
 * The source is a black-on-white PNG, which is the ideal case for tracing: one
 * threshold, no colour to lose. Output paths use `currentColor` so the mark
 * inherits the theme the same way the wordmark does.
 *
 * Usage: node scripts/build-mark.mjs <source.png>
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import potrace from 'potrace'

const SRC = process.argv[2]
const PUBLIC = path.resolve('public')

if (!SRC) {
  console.error('Pass the source image: node scripts/build-mark.mjs <file.png>')
  process.exit(1)
}

/** Trace at high fidelity. turdSize drops specks the tracer invents at edges. */
function trace(buffer) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      buffer,
      { threshold: 128, turdSize: 4, optCurve: true, optTolerance: 0.2, color: '#000' },
      (err, svg) => (err ? reject(err) : resolve(svg)),
    )
  })
}

async function main() {
  const raw = await readFile(SRC)

  // Trim the white margin first so the traced viewBox is the mark itself.
  // Without this every downstream size inherits the generator's padding.
  // flatten() before anything else: the source may carry alpha, and trim()
  // adds it. negate() inverts alpha too, which silently turns the plate
  // transparent further down.
  const trimmed = await sharp(raw)
    .flatten({ background: '#ffffff' })
    .greyscale()
    .normalise()
    .threshold(128)
    .trim({ threshold: 10 })
    .flatten({ background: '#ffffff' })
    .toBuffer()

  const meta = await sharp(trimmed).metadata()
  console.log(`trimmed to ${meta.width}x${meta.height} (ratio ${(meta.width / meta.height).toFixed(2)})`)

  const svg = await trace(trimmed)

  // potrace emits a fixed fill and its own width/height. Strip both so the
  // mark scales with the box it is dropped into and follows the text colour.
  const paths = svg
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .trim()

  const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${meta.width} ${meta.height}" fill="currentColor" role="img" aria-label="Stylish NYC">
${paths}
</svg>
`
  await writeFile(path.join(PUBLIC, 'logo-mark.svg'), out, 'utf8')
  console.log('wrote public/logo-mark.svg')

  // Favicon set, drawn as a light mark on a dark plate.
  //
  // A transparent black mark would vanish against a dark browser tab strip, and
  // this mark is thin enough that it needs all the help it can get at 16px. The
  // plate also gives it a square silhouette, which a 0.40 ratio shape otherwise
  // does not have.
  //
  // linear() maps the traced black/white to the brand's off-black and off-white
  // in one pass: 0 -> 0x0b, 255 -> 0xed.
  const TINT_SCALE = (0xed - 0x0b) / 255
  const TINT_OFFSET = 0x0b

  // Composite onto an explicit plate rather than leaning on resize()'s
  // background. A greyscale pipeline does not reliably honour an RGB padding
  // colour, which silently leaves white bars either side of a tall mark.
  async function plate(size) {
    // Inset slightly so the mark does not touch the icon edge.
    const inner = Math.round(size * 0.88)

    const mark = await sharp(trimmed)
      .negate({ alpha: false }) // mark becomes light, ground becomes dark
      .linear(TINT_SCALE, TINT_OFFSET)
      .toColourspace('srgb')
      .resize({ height: inner, fit: 'inside' })
      .png()
      .toBuffer()

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: { r: 0x0b, g: 0x0b, b: 0x0c },
      },
    })
      .composite([{ input: mark, gravity: 'center' }])
      .png()
  }

  for (const size of [16, 32, 180, 512]) {
    const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`
    await (await plate(size)).toFile(path.join(PUBLIC, name))
    console.log(`wrote public/${name}`)
  }

  // SVG favicon. Fixed brand colours rather than currentColor: browser chrome
  // gives an icon no inherited colour to work with.
  //
  // Padded out to a true square with even margins, computed from the traced
  // bounds rather than hardcoded, so a square mark and a tall one both sit
  // centred instead of one of them being cropped or floated.
  const side = Math.round(Math.max(meta.width, meta.height) * 1.18)
  const ox = Math.round((side - meta.width) / 2)
  const oy = Math.round((side - meta.height) / 2)

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">
<rect width="${side}" height="${side}" fill="#0b0b0c"/>
<g transform="translate(${ox} ${oy})">
${paths.replace(/fill="currentColor"/g, 'fill="#edede9"')}
</g>
</svg>
`
  await writeFile(path.join(PUBLIC, 'favicon.svg'), faviconSvg, 'utf8')
  console.log('wrote public/favicon.svg')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
