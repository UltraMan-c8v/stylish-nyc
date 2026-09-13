# Stylish NYC

Landing page for a fictional SoHo hair salon. Vite, React 19, Tailwind v4, Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Before this goes live

### 1. Replace the placeholder content

Every invented value is in [`src/data/content.ts`](src/data/content.ts). Nothing
factual is hardcoded anywhere else. Search that file for `PLACEHOLDER`.

Real so far: the salon phone number, and Roman Miyerov's name. Everything below
is still invented.

| Value | Current placeholder |
| --- | --- |
| Address | 114 Crosby Street, Floor 2, New York, NY 10012 |
| Email | front@stylish.nyc |
| Opening hours | Tue-Fri 10-20, Sat 9-18, Sun 11-17, Mon closed |
| Roman's bio and "opened the studio in 2016" | stand-in copy, needs his own words |
| Testimonials | Marisol Trigo, Jonah Weiss-Abbate |
| Prices | 12 invented prices, roughly SoHo market rate |

### 2. Booking: phone only

There is no booking form anywhere on the site, by request. The closing section
carries a small "Online booking coming soon" note under the button.

Every call to action is a real `tel:` link in the markup that opens a dialog
first (`src/components/CallDialog.tsx`), showing the number and the opening
hours, with a "Call now" button that hands off to the OS dialer. Desktop
visitors cannot dial from the machine they are reading on, so a bare `tel:`
link is a dead end for them. The link still works with JavaScript off.

Both legal pages are written against that. If online booking is ever added, the
privacy policy has to change with it: the "What the website collects" section
currently states outright that there is no form and nothing to submit.

### 3. Have a lawyer read the legal pages

`/terms/` and `/privacy/` live in [`src/data/legal.ts`](src/data/legal.ts).
They are written specifically against what this site actually does today: no
forms at all, a theme preference in local storage, no analytics, no cookies, no
payments. If any of that changes, the privacy policy has to change with it.

They are not legal advice and have not been reviewed by a lawyer. Four values
are marked PLACEHOLDER and must be set before publishing:

- the registered legal entity name
- the effective date (currently reads "Not yet published")
- the real cancellation window
- the actual hosting and email providers, named in "Who else sees it"

### 4. Logo: paused

`LogoStacked` from [`src/components/Logo.tsx`](src/components/Logo.tsx) is live
in the nav: STYLISH over NYC with a hairline between, set in Bodoni Moda. All
three elements share one measure and the widths are pinned with `textLength`,
so the lockup does not reflow when the webfont loads. `LogoMonogram` and
`LogoMark` are unused alternates in the same file.

The favicon is a separate mark, generated elsewhere and traced to vector. See
below.

Search for a proper symbol is on hold. When one exists, lock it up to the left
of the stacked wordmark in the nav.

The wordmark SVGs use live text, which is right for the site because the font
is already loaded. For a portable asset (print, or anywhere the font is
absent) the letterforms need outlining to paths first.

### 5. Importing Roman's own photographs

Drop his files into `public/img/incoming`, then:

```bash
node scripts/import-work.mjs
```

Each is cropped to the gallery's 3:4, converted to greyscale and written as a
1100px WebP. Greyscale is baked into the file as well as applied in CSS, so
nothing flashes colour on load. The script prints a ready-made `work` array to
paste into `src/data/content.ts`. Write real alt text and captions: they are
what a blind visitor and Google Images both read.

### 6. Swap the rest of the photography

All images are AI generated and live in `public/img`. They are placeholders for
a real shoot. Originals are archived in `public/img/src` (git-ignored, not
served).

Roman's two portraits were made with Nano Banana Pro from photographs he
supplied. `soul_2` is the wrong model for this: it runs a prompt enhancer that
rewrites your instructions into a description of the reference photo, so it
reproduces the snapshot instead of restyling the person.

### 7. Regenerating the favicon

The favicon is the hair-ribbon mark, traced from a raster source to vector:

```bash
node scripts/build-mark.mjs path/to/mark.png
```

It expects black on white. The script trims the margin, traces to
`public/logo-mark.svg` with `currentColor`, and writes `favicon.svg`,
`favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` and
`favicon-512.png` as a light mark on a dark plate.

Known limit: that mark is 0.40 aspect, so it pads heavily inside a square icon
and its thin tapers go muddy below about 32px. A squarer, heavier mark would
sit better in a tab.

After dropping new files into `public/img`, run:

```bash
node scripts/optimize-images.mjs
```

It resizes each PNG to the width it is actually rendered at, converts to WebP,
and moves the original into `public/img/src`. Widths are configured per image
at the top of that script. The current set went from 63MB to 2MB.

## Design notes

**Palette is strictly achromatic.** Every token has zero saturation. The only
colour on the page comes from the photography. Neither theme uses pure `#000`
or pure `#fff`.

**Theme.** Dark by default. The toggle writes to `localStorage` and an inline
script in `index.html` applies the stored choice before first paint, so there
is no flash. First-time visitors get their OS preference. Switching runs a
circular View Transition wipe out of the toggle button, and falls back to a
plain colour crossfade where that API is unavailable.

**Type.** Bodoni Moda for display, Geist for UI, Geist Mono for metadata. All
three are self-hosted through `@fontsource-variable`, not linked from Google.

**Shape rule.** Rectangles are sharp at 2px everywhere. Circles appear only as
icon wells and avatars, where the circle is the actual form.

**Contrast.** Both themes pass WCAG AA for every piece of text. Interactive
boundaries use a separate `--line-control` token that clears 3:1, so control
edges are accessible without coarsening the decorative hairlines.

**Motion.** Everything animates on `transform` and `opacity` only. Scroll
arrival uses Motion's `whileInView`; nothing listens to the window scroll
event. All of it collapses under `prefers-reduced-motion`.

## SEO

Implemented:

- `HairSalon` JSON-LD in `index.html` with address, phone, hours, founder,
  service catalogue and the Instagram profile as `sameAs`
- Canonical URLs, Open Graph and Twitter card meta on all three pages
- `public/og.jpg`, the 1200x630 social card, rebuilt with
  `node scripts/build-og.mjs`
- `public/robots.txt` and `public/sitemap.xml`

**Every one of those files contains `stylishnyc.com`.** Find and replace it
across `index.html`, `terms/index.html`, `privacy/index.html`, `robots.txt` and
`sitemap.xml` the moment the real domain exists, then rebuild.

The JSON-LD also carries the placeholder street address. Schema with a wrong
address is worse than no schema, because Google cross-checks it against the
Google Business Profile. Fix it before the site is indexed.

## Deploying

`vercel.json` is configured: static build, clean URLs, immutable caching on
hashed assets and images, basic security headers.

```bash
npx vercel deploy --prod --yes
```
