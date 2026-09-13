/**
 * ============================================================================
 * Real, owner-supplied content. Placeholders are marked PLACEHOLDER.
 * ============================================================================
 *
 * Supplied by Roman on the call: address, email, hours, prices, biography,
 * trademark line. Still outstanding: gallery photographs, his logo file, and
 * the videos for the recommendations section.
 */

export const salon = {
  name: 'Stylish NYC',
  /** REAL. Roman operates out of Antonio Prieto Salon in Chelsea. */
  venue: 'Antonio Prieto Salon',
  street: '124 West 20th Street',
  /** CONFIRM: 124 W 20th St is Chelsea, which is 10011. Worth checking. */
  city: 'New York, NY 10011',
  neighborhood: 'Chelsea',
  phone: '(917) 207-7278',
  phoneHref: 'tel:+19172077278',
  email: 'hairbyroman@gmail.com',
  emailHref: 'mailto:hairbyroman@gmail.com',
  instagram: '@stylishnyc',
  instagramHref: 'https://www.instagram.com/stylishnyc/',
  /** Footer mark, exactly as Roman asked for it. */
  trademark: 'StylishNYC',
} as const

/**
 * REAL. By appointment only, seven days, opening at 10:00.
 * Saturday closes 19:00, Sunday 18:00, everything else 20:00.
 */
export const hours = [
  { days: 'Monday to Friday', time: '10:00 to 20:00' },
  { days: 'Saturday', time: '10:00 to 19:00' },
  { days: 'Sunday', time: '10:00 to 18:00' },
] as const

export const HOURS_NOTE = 'By appointment only.'

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#team' },
  { label: 'Prices', href: '/prices/' },
] as const

export const CTA_LABEL = 'Call to book'
export const CTA_NOTE = 'Online booking coming soon.'

export const legalNav = [
  { label: 'Terms', href: '/terms/' },
  { label: 'Privacy', href: '/privacy/' },
] as const

export const work = [
  {
    src: '/img/work-bob.webp',
    alt: 'The back of a precision blunt bob cut to a sharp horizontal line at the jaw.',
    caption: 'Blunt bob, cut dry',
  },
  {
    src: '/img/work-movement.webp',
    alt: 'Long layered hair caught mid turn, strands fanning out under hard rim light.',
    caption: 'Long layers with weight removed',
  },
  {
    src: '/img/work-curls.webp',
    alt: 'Dense natural curls backlit so light passes through the edge of each coil.',
    caption: 'Curl shaping, cut in its natural pattern',
  },
  {
    src: '/img/work-sectioning.webp',
    alt: 'A stylist hand sectioning long dark hair with a fine tail comb.',
    caption: 'Sectioning before a single process',
  },
] as const

export const services = [
  {
    id: 'cutting',
    title: 'Precision cutting',
    body: 'Cut dry, in your natural texture, so the shape you leave with is the shape you can rebuild at home.',
    image: '/img/service-cut.webp',
    alt: 'Scissors mid cut through a taut section of straight dark hair.',
    span: 'lg',
  },
  {
    id: 'color',
    title: 'Colour',
    body: 'Classical technique with a modern edge, mixed at the chair and customised to the person in it.',
    image: '/img/service-gloss.webp',
    alt: 'A glossy hair treatment poured in a thin ribbon into a shallow ceramic bowl.',
    span: 'md',
  },
  {
    id: 'texture',
    title: 'Curl and texture',
    body: 'Shaped wet to dry, cut in the pattern your hair actually falls in rather than pulled straight first.',
    image: '/img/service-curl.webp',
    alt: 'A dense pattern of natural curls filling the frame against a pale background.',
    span: 'sm',
  },
  {
    id: 'styling',
    title: 'Styling and glam',
    body: 'Blowdry, curls, waves and red carpet finishing for the days that need to photograph well.',
    image: '/img/service-treatment.webp',
    alt: 'A woman leaning back into a salon wash basin with water running through her hair.',
    span: 'sm',
  },
  {
    id: 'extensions',
    title: 'Extensions',
    body: 'Clip-on Remy, colour matched and fitted so the blend disappears. Cut and styling included.',
    image: null,
    alt: null,
    span: 'md',
  },
] as const

/**
 * Biography.
 *
 * `bio` is Roman's own text with grammar and punctuation corrected. Every fact,
 * every salon name and the order of his points are unchanged. `bioVerbatim`
 * below is exactly what he sent, kept so the edit can be checked or reverted.
 *
 * One word was dropped: he wrote "third generation aspiring European
 * hairstylist". "Aspiring" reads oddly against a CV that includes national
 * educator roles, so it is not in the live copy. Worth confirming with him in
 * case he meant something specific by it.
 */
export const owner = {
  name: 'Roman Miyerov',
  role: 'Founder',
  since: 'Third generation hairstylist',
  bio: [
    'Roman Miyerov is a third generation European hairstylist. He has worked in the top salons in New York City, including Dop Dop, The Salon Project, DevaCurl and The Red Door by Elizabeth Arden.',
    'He is also a recognised national educator for Aveda and L’Oréal, and taught in their institutes for a number of years.',
    'His work brings the classical techniques of hairdressing together with the modern touch of the fashion industry today, and every idea is customised to the individual in the chair. That is where the intelligence of the work lives, in the art of hair colour.',
    'Roman works in the heart of New York City.',
  ],
  /**
   * The ?v= is a cache bust, and it is load-bearing.
   *
   * /img/ was served with `max-age=31536000, immutable` until now. That header
   * is a promise the bytes at a URL will never change, which is true for
   * /assets/ (Vite hashes those filenames) and false for anything here, where
   * the names are hand-written and stable across content changes. Replacing
   * this portrait therefore changed nothing for anyone who had already loaded
   * the page: their browser had been told not to ask again for a year.
   *
   * The header is fixed now, but that fix cannot reach an entry already stored
   * under `immutable`. Only a different URL can. Bump the number whenever a
   * file in /img/ is replaced in place rather than renamed.
   */
  portrait: '/img/stylist-roman.webp?v=2',
  portraitAlt: 'Portrait of Roman Miyerov, owner of Stylish NYC.',
} as const

/** Roman original wording, unedited, kept for reference. */
export const bioVerbatim =
  'Roman Miyerov is a third generation aspiring European hairstylist. In the past he worked in New York City top salons like: Dop Dop, The Salon Project, DevaCurl (Devachan) and The Red Door by Elizabeth Arden (Mynd). He also recognized as a national Aveda and L’Oréal educator, teaching in their Institutes for numerous years. His vision collide in fusion with fundamentals. Using classical techniques of hairdressing, as well the modern touch of today trend in fashion industry. He customizes each of his creative idea for each individual. That defines intelligence in abstract novel through the art of hair coloring. Presently Roman working in a heart of New York city.'

export const visit = [
  {
    title: 'Consultation',
    body: 'Time before scissors touch anything. We look at how your hair sits when you have done nothing to it, and what you actually do most mornings.',
  },
  {
    title: 'The chair',
    body: 'Roman start to finish. Nobody hands you off halfway, and no assistant finishes a cut somebody else started.',
  },
  {
    title: 'Aftercare',
    body: 'You are shown how to get the shape back yourself, with what you already own. If a product would genuinely help, we say which one and why.',
  },
] as const

/**
 * PLACEHOLDER testimonials. Roman still owes two real ones.
 *
 * Both names are female at his request. They are invented, so they carry no
 * real person's endorsement: swap them the moment two genuine quotes arrive.
 */
export const voices = [
  {
    quote:
      'I have had the same bob for nine years and nobody has cut it this well. It still falls right on day five.',
    name: 'Marisol Trigo',
    detail: 'Prospect Heights',
  },
  {
    quote:
      'He talked me out of the colour I walked in asking for and gave me one that suits me. First time that has happened.',
    name: 'Dahlia Okonkwo',
    detail: 'Murray Hill',
  },
] as const

/**
 * REAL prices, in USD.
 *
 * Roman instruction: match Antonio Prieto Salon and add $10 to every line.
 * Haircut is the exception. He gave his own figures for that, $150 starting
 * and $250 below the shoulders, which override the $200 on Antonio list.
 *
 * NOTE: Antonio published list carries no colour pricing, so there is none
 * here. Roman biography is largely about colour work, so this is the one
 * obvious hole in the menu. Worth asking him for it.
 */
export const menu = [
  {
    group: 'Cutting',
    items: [
      { name: 'Haircut', price: 'from 150' },
      { name: 'Haircut, below the shoulders', price: '250' },
    ],
  },
  {
    group: 'Styling',
    items: [
      { name: 'Glam blowdry', price: '160' },
      { name: 'Glam curl', price: '185' },
      { name: 'Glam waves', price: '185' },
      { name: 'Glam straight', price: '185' },
      { name: 'Glam red carpet', price: '210' },
    ],
  },
  {
    group: 'Extensions and makeup',
    items: [
      { name: 'Clip-on Remy extensions', price: '710' },
      { name: 'Makeup', price: '210 to 235' },
    ],
  },
] as const

/**
 * Gallery. REAL, Roman's own photographs.
 *
 * Colour is kept in the file. The grid desaturates in CSS and restores the
 * real colour on hover, so a baked-greyscale file would make the hover
 * impossible.
 *
 * `caption` is the line under the frame, `note` the description in the
 * lightbox. Both are written here rather than by Roman, so they describe only
 * what is visible in the frame. Worth having him read them before launch in
 * case he wants to claim a specific technique.
 *
 * To add more: drop files into public/img/incoming, run
 * `node scripts/import-gallery.mjs`, and paste the rows it prints.
 */
export const gallery = [
  {
    src: '/img/client-gloss-brunette.webp',
    alt: 'A client with long dark brunette hair falling straight past the shoulders, face-framing layers, high shine.',
    caption: 'Long layers, high shine',
    note: 'Face-framing layers cut into length that stays long, finished to a mirror shine.',
  },
  {
    src: '/img/client-length-black.webp',
    alt: 'A client photographed from the side against a pale stone wall, jet black hair falling straight to the waist.',
    caption: 'Kept to one clean line',
    note: 'Waist length finished straight and blunt, so the ends read as a single edge rather than tapering away.',
  },
  {
    src: '/img/client-chair-roman.webp',
    alt: 'Roman Miyerov standing behind a client seated in a salon chair, comb in hand, in the Chelsea studio.',
    caption: 'In the chair',
    note: 'Roman at the chair in Chelsea. Every client is his start to finish, with nobody handing you off halfway.',
  },
  {
    src: '/img/client-slick-smile.webp',
    alt: 'A laughing client on the street, long dark hair falling straight from a centre part.',
    caption: 'Straight, worn long',
    note: 'The same client on the same afternoon, turned into the light. Straightened through the length and left to fall from a centre part.',
  },
  {
    src: '/img/client-editorial-gold.webp',
    alt: 'An editorial studio shot: dark hair rolled up into height at the crown and swept back, gold dress, red lip.',
    caption: 'Editorial, rolled volume',
    note: 'Built for a shoot. Height rolled back off the forehead and the length taken behind the shoulder, set to hold under lights.',
  },
] as const

/**
 * Makeovers, before and after.
 *
 * PROVENANCE, and it matters: these are Antonio Prieto Salon's own makeover
 * photographs, from antonioprietosalon.com/prieto-select/select-makeovers.
 * Roman works out of that salon, which is why they are here, but they are not
 * captioned as his clients and the section says whose they are. Presenting
 * another salon's shoot as this one's portfolio would be a claim about work
 * that has not been done here, which is a different and worse problem than the
 * copyright one. Get written sign-off from Roman before launch.
 *
 * The source files are single JPEGs with both halves and a white gutter
 * painted down the middle. `node scripts/split-makeovers.mjs` finds that
 * gutter and cuts them apart, so the layout can supply its own gap in the
 * page's colour instead of carrying a bright bar through every frame.
 *
 * Captions describe only the visible change. No technique is claimed.
 */
export const makeovers = [
  {
    before: '/img/makeover-01-before.webp',
    after: '/img/makeover-01-after.webp',
    caption: 'Waves, set deep',
    note: 'Taken to a deep side part and set into a soft wave that holds its shape all the way down the length.',
  },
  {
    before: '/img/makeover-02-before.webp',
    after: '/img/makeover-02-after.webp',
    caption: 'Weight taken out',
    note: 'Bulk removed through the mid-lengths so the natural wave falls in one direction instead of three.',
  },
  {
    before: '/img/makeover-03-before.webp',
    after: '/img/makeover-03-after.webp',
    caption: 'Blunt fringe, taken up',
    note: 'A blunt fringe cut in and the rest lifted back, so the fringe and the jaw carry the whole shape.',
  },
  {
    before: '/img/makeover-04-before.webp',
    after: '/img/makeover-04-after.webp',
    caption: 'Colour and a clean line',
    note: 'Warmed through and finished straight, with the ends brought to a single edge.',
  },
  {
    before: '/img/makeover-05-before.webp',
    after: '/img/makeover-05-after.webp',
    caption: 'Curls, set and polished',
    note: 'The natural wave shaped into a set curl and glossed, so the copper reads as one tone rather than several.',
  },
  {
    before: '/img/makeover-06-before.webp',
    after: '/img/makeover-06-after.webp',
    caption: 'Smoothed and dropped to one side',
    note: 'Taken through the length and swept across, finished with enough gloss to hold the light.',
  },
  {
    before: '/img/makeover-07-before.webp',
    after: '/img/makeover-07-after.webp',
    caption: 'Undone, on purpose',
    note: 'Length pinned up loosely with the texture left in, which takes considerably more work than it looks like it does.',
  },
  {
    before: '/img/makeover-08-before.webp',
    after: '/img/makeover-08-after.webp',
    caption: 'Rolled and pinned',
    note: 'A high roll set off the face and pinned back, kept glossy across the crown.',
  },
  {
    before: '/img/makeover-09-before.webp',
    after: '/img/makeover-09-after.webp',
    caption: 'Cut to an asymmetric line',
    note: 'Taken short and cut on an angle, with a long sweep left to fall across one eye.',
  },
  {
    before: '/img/makeover-11-before.webp',
    after: '/img/makeover-11-after.webp',
    caption: 'Braided crown',
    note: 'The length braided and carried around the head, so the shape sits like a halo instead of hanging.',
  },
  {
    before: '/img/makeover-12-before.webp',
    after: '/img/makeover-12-after.webp',
    caption: 'Pixie, given height',
    note: 'The same short cut lifted and sculpted back off the forehead, which is nearly all of the difference.',
  },
  {
    before: '/img/makeover-13-before.webp',
    after: '/img/makeover-13-after.webp',
    caption: 'Short, curled, full',
    note: 'Taken to the jaw and curled outward, so the shape reads wide rather than long.',
  },
] as const

/** Credit line for the makeover set. Do not quietly drop this. */
export const MAKEOVERS_CREDIT = 'Antonio Prieto Salon'

/**
 * The film Roman asked for.
 *
 * NOTE: this is a Kerastase Elixir Ultime brand commercial, not footage of his
 * own work, so the caption says so rather than implying the salon shot it.
 * Check he has the right to host it before the site is indexed. Salons are
 * usually given these as stockists, but "usually" is not the same as "yes".
 */
export const galleryFilm = {
  src: '/video/film-elixir.mp4',
  poster: '/img/film-elixir-poster.webp',
  caption: 'Kerastase Elixir Ultime',
  note: 'The Elixir Ultime film. Kerastase is the finishing oil used in the studio, and it is what most of the shine in these pictures is doing.',
} as const

/**
 * REAL. Cancellation policy, exactly as Roman gave it.
 *
 * The card-on-file line describes something the site cannot currently do:
 * there is no booking flow, so the card is taken by phone. Worth restating
 * that here if online booking is ever built.
 */
export const cancellation = {
  title: 'Cancellation policy',
  points: [
    'All new clients require a credit card for their first appointment.',
    'We require 24 hours notice for all cancellations and appointment changes.',
    'No-shows are subject to a 100% service charge. Late cancellations are subject to a 50% charge.',
  ],
} as const

/**
 * Google Maps embed.
 *
 * The keyless `output=embed` form rather than the Embed API: it needs no key,
 * no billing account and no key restriction to maintain, and it renders the
 * same map. `href` opens the full listing in the visitor's own maps app.
 *
 * ADDRESS DISCREPANCY, needs Roman: he gave 124 West 20th Street. Google's own
 * listing for Antonio Prieto Salon reads 127 West 20th Street, between 6th and
 * 7th. His number is what the site displays, because it is his business, but
 * one of the two is wrong and a wrong street number on a salon is the kind of
 * error that costs an appointment.
 *
 * The query deliberately carries the salon name and the zip and no street
 * number at all. Google resolves the business either way, and leaving the
 * disputed number out means the pin cannot be dragged to the wrong door by it.
 */
export const maps = {
  query: 'Antonio Prieto Salon, New York, NY 10011',
  get embedSrc() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.query)}&output=embed`
  },
  get href() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.query)}`
  },
  title: 'Map showing Antonio Prieto Salon on West 20th Street, New York',
} as const
