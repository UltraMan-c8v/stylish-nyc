# Stylish NYC — handover

Everything you need to own and run **stylishnyc.com**. Keep this file.

---

## What you own

| Thing | Where it lives | Who pays |
|---|---|---|
| The domain, `stylishnyc.com` | GoDaddy, your account | You, yearly (~$20) |
| The website hosting | Vercel, your account | Free tier |
| The source code | This folder, and your GitHub if you set one up | Free |

The website is a **static site**. There is no database, no server and nothing
to install. It is a set of files that a host gives out to visitors. That is why
hosting is free and why it is very hard to break.

---

## Making changes

**There is no login and no admin panel.** Changing text, prices or photographs
means editing the source code and republishing. That is a job for a web
developer, and it is a small one — any freelancer can do it in under an hour
once they have this folder.

What to send a developer:

1. This folder, or the GitHub repository if one was created
2. The Vercel login for the hosting
3. `README.md` in this folder, which explains how to run and publish it

Nearly everything a normal update touches lives in **one file**:
`src/data/content.ts` — prices, hours, address, phone, biography, gallery
captions, testimonials. A developer will find it immediately.

### Photographs

New images go in `public/img/`. There are two helper scripts:

```bash
node scripts/import-gallery.mjs   # client photos -> web-sized, colour kept
node scripts/optimize-images.mjs  # large PNGs -> web-sized WebP
```

Important: gallery photographs are stored **in colour**. The site turns them
grey and restores the colour on hover. Do not upload black and white files or
that effect stops working.

### Publishing a change

```bash
npm install
npm run build
npx vercel --prod
```

---

## Before you tell anyone about the site

These are real and they are yours to decide on. The site is live and now
visible to Google, so they matter.

### 1. The street number may be wrong

The site says **124 West 20th Street**, because that is what you gave.
Google's own listing for Antonio Prieto Salon says **127 West 20th Street**.
One of them is wrong. Check it and have a developer change
`src/data/content.ts` if needed. A wrong number on a salon costs appointments.

### 2. The two reviews are not real

The quotes from "Marisol Trigo" and "Dahlia Okonkwo" are placeholders written
to show the layout. **They are invented.** Replace them with two real quotes
from real clients, or have them removed. Leaving invented reviews on a live
business site is a genuine legal risk in the US, not just a bad look.

### 3. Two sets of images are not yours

- The **before/after makeovers** are Antonio Prieto Salon's photographs. The
  page credits the salon by name, which is why it is defensible. Do not remove
  that credit.
- The **film** is a Kérastase Elixir Ultime commercial. Confirm you are allowed
  to host it. Salons are often given these as stockists, but confirm.

If either becomes a problem, a developer can remove the section in minutes.

### 4. The legal pages need real values

`src/data/legal.ts` has four items marked `PLACEHOLDER`: the legal entity name,
the effective date, the cancellation window, and your hosting and email
providers. **Have a lawyer read both pages before relying on them.** They were
written as a starting point, not as legal advice.

The terms still ask clients for notice before cancelling. That is worth keeping
even though the site no longer publishes a full cancellation policy: the policy
came down because you do not currently take a card from new clients, and a
stated rule you do not enforce is worse than no rule at all.

---

## Renewals, so nothing disappears

| What | When | What happens if you miss it |
|---|---|---|
| Domain `stylishnyc.com` | Yearly, at GoDaddy | The site goes dark and someone else can buy your name |
| Hosting | No renewal | — |

**Turn on auto-renew for the domain.** It is the only thing that can take the
site away from you, and it is about $20 a year.

One note on hosting: Vercel's free tier is described as being for personal,
non-commercial projects. Plenty of small businesses run on it without issue,
but if Vercel ever raises it, the fix is $20/month for their Pro plan, or
moving to Cloudflare Pages, whose free tier does allow business use. Any
developer can move it in under an hour.

---

## Pointing the domain at the site

In GoDaddy, under `stylishnyc.com` → **DNS** → **Manage Zones**:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 1 hour |
| `CNAME` | `www` | `cname.vercel-dns.com` | 1 hour |

Delete any existing `A` or `CNAME` records on `@` or `www` first — GoDaddy adds
its own parking records, and two conflicting records is the usual reason this
does not work on the first try.

Then in Vercel: **stylish-nyc → Settings → Domains → Add** → `stylishnyc.com`.
The secure padlock appears on its own within a few minutes. Changes take
10–30 minutes to spread, occasionally a few hours.

---

## Where things are

```
src/data/content.ts     prices, hours, address, phone, bio, gallery, reviews
src/data/legal.ts       terms and privacy text
src/pages/              one file per page
src/components/         the pieces each page is built from
src/index.css           the seven colour palettes
public/img/             every photograph on the site
public/video/           the film
_source-images/         untouched originals, never published. Keep a copy.
scripts/                image tools
vercel.json             hosting and caching settings
```

One thing worth knowing if a developer replaces a photograph: images are cached
by filename. If a file is swapped without renaming it, returning visitors keep
seeing the old one. The fix is the `?v=` number in `content.ts` — there is a
comment there explaining it.

---

## The site

| Page | Address |
|---|---|
| Home | `/` |
| Gallery | `/gallery/` |
| Prices | `/prices/` |
| Terms | `/terms/` |
| Privacy | `/privacy/` |
| Alternate design | `/concept/` — deliberately hidden from Google |

Booking is by phone. The "Call to book" button shows the number on screen and
offers to dial it. The site says online booking is coming soon; if that is not
going to happen, have a developer remove that line.

---

## Getting found on Google

The site is built for it: structured business data describing the salon, a
sitemap, and correct titles and descriptions on every page. Google can read all
of it as soon as it crawls the site.

Ranking well locally also takes work outside the site itself. Ask your
developer about it when you are ready.
