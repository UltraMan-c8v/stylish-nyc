/**
 * Builds the 1200x630 social card from the studio photograph.
 *
 * Text is drawn as an SVG overlay. sharp renders SVG through librsvg, which
 * resolves fonts from the system rather than from the project, so this uses a
 * generic serif stack instead of Bodoni Moda. It is close enough at card size
 * and it cannot fail to a blank box on a machine without the webfont installed.
 */
import sharp from 'sharp'
import path from 'node:path'

const W = 1200
const H = 630
const SRC = path.resolve('public/img/salon-interior.webp')
const OUT = path.resolve('public/og.jpg')

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#08080a" stop-opacity="0.30"/>
      <stop offset="55%" stop-color="#08080a" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#08080a" stop-opacity="0.94"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <text x="80" y="450" font-family="Bodoni MT, Didot, Georgia, serif" font-size="96"
        letter-spacing="10" fill="#f2f2ee">STYLISH</text>
  <rect x="80" y="482" width="470" height="2" fill="#f2f2ee"/>
  <text x="80" y="540" font-family="Bodoni MT, Didot, Georgia, serif" font-size="40"
        letter-spacing="26" fill="#f2f2ee">NYC</text>
  <text x="80" y="592" font-family="Helvetica, Arial, sans-serif" font-size="24"
        letter-spacing="1" fill="#b9b9bd">Precision cutting and colour. SoHo, New York.</text>
</svg>`)

await sharp(SRC)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .greyscale()
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT)

const { size } = await sharp(OUT).metadata()
console.log(`wrote public/og.jpg (${Math.round((size ?? 0) / 1024)}kb)`)
