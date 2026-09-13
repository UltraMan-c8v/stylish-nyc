import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE_OUT } from '../lib/motion'
import { salon } from '../data/content'
import { RevealFrame } from '../components/RevealFrame'
import { Loader } from '../components/Loader'

/**
 * /concept/ - a second visual direction, deliberately unlike the main site.
 *
 * Two references are doing the work. The masthead comes from the Gielly Green
 * landing page: a framed card on an oxblood field, oversized hairline serif,
 * first word upper left and second lower right across a portrait. The sections
 * below come from demo-salon.ru: an oversized ghost word behind a small bold
 * heading, an asymmetric image grid, and category labels set vertically down
 * the outer edges.
 *
 * Everything is scoped to this page and sets its own colours inline. It is a
 * different world, not another palette of the same one.
 */

const OXBLOOD = '#5e181f'
const CARD = '#d2d0cb'
const INK = '#fbf9f6'
const DARK = '#211d1d'

const CONCEPT_SERIF = { fontFamily: 'var(--font-concept)', fontWeight: 300 } as const

/**
 * The frame inset, in rem, at the top of the page.
 *
 * Two values rather than one. 2rem of oxblood around a 1400px desktop card
 * reads as a mount; the same 2rem around a 375px phone is a third of the
 * screen width gone to border, and the picture inside it stops being the
 * subject. Matched to Tailwind's md breakpoint so it changes with the layout.
 */
const FRAME = { mobile: { inset: 0.6, radius: 14 }, desktop: { inset: 2, radius: 26 } }

function useFrame() {
  const [frame, setFrame] = useState(FRAME.desktop)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setFrame(mq.matches ? FRAME.desktop : FRAME.mobile)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return frame
}

/** Category label running vertically down an outer edge. */
function EdgeLabel({ children, side }: { children: string; side: 'left' | 'right' }) {
  return (
    <span
      className="hidden shrink-0 self-center font-mono text-[0.625rem] tracking-[0.22em] uppercase opacity-70 lg:block"
      style={{ writingMode: 'vertical-rl', rotate: side === 'left' ? '180deg' : undefined }}
    >
      {children}
    </span>
  )
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Scroll-linked frame. The oxblood border and the corner radius close down to
  // nothing as the first screen scrolls away, so the card grows into a
  // full-bleed image instead of staying in its box.
  //
  // clip-path rather than padding: animating padding relayouts the whole
  // subtree every frame. Clipping repaints one element and leaves the page
  // behind it alone, which is what makes the border look like it retracts.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const frame = useFrame()
  const inset = useTransform(scrollYProgress, [0, 0.85], [frame.inset, 0])
  const radius = useTransform(scrollYProgress, [0, 0.85], [frame.radius, 0])
  const clipPath = useTransform([inset, radius], ([i, r]: number[]) => `inset(${i}rem round ${r}px)`)
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="relative h-[100dvh] w-full" style={{ background: OXBLOOD }}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ background: CARD, clipPath: reduce ? undefined : clipPath }}
      >
        {/* Full bleed at every width. An earlier version gave the photograph
            only the top half on mobile and put the masthead on bare card
            colour underneath, which left the picture looking cropped into a
            strip. The type sits over it instead, the way it does on desktop.

            object-position has to favour the right side on a narrow screen:
            the source deliberately leaves its left two thirds empty to make
            room for the desktop type, so a centred crop lands on blank
            backdrop and the frame reads as an empty panel. */}
        <motion.img
          src="/img/concept-bg.webp"
          alt="A woman with tousled shoulder-length hair caught mid-movement against a warm grey backdrop."
          width={2800}
          height={1867}
          fetchPriority="high"
          decoding="async"
          className="concept-photo absolute inset-0 h-full w-full object-cover object-[74%_22%] md:h-[112%] md:object-[60%_center]"
          style={{ y: reduce ? undefined : imageY, filter: 'grayscale(0.18) contrast(1.02)' }}
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.75, ease: EASE_OUT }}
        />

        {/* Scrim, mobile only. Desktop gets its contrast from the mask fade on
            the left of the photograph; a phone has no empty side to fade, so
            the type needs its own ground to sit on. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[66%] md:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(20,16,16,0.82) 0%, rgba(20,16,16,0.55) 38%, rgba(20,16,16,0) 100%)',
          }}
        />

        {/* Masthead. First word upper left, second lower right, straddling the
            portrait, which is the composition from the reference. NYC is
            letter-justified across its own measure so three letters hold a line
            against seven without reading as a stub. */}
        {/*
          Mobile hangs the masthead off the bottom of the frame rather than
          centring it: the subject of the photograph sits in the upper half, so
          type centred vertically would land across her face. Desktop centres,
          because there the composition is type beside subject, not over it.

          Horizontal padding stays above the frame inset at both sizes, or the
          justified C runs into the clip edge and loses its right stem.
        */}
        <div className="absolute inset-x-0 bottom-[13%] z-10 flex flex-col justify-end px-6 md:inset-0 md:justify-center md:px-14">
          <h1 style={{ ...CONCEPT_SERIF, color: INK }} className="leading-[0.86]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block w-full text-left text-[clamp(3rem,13vw,10.5rem)] md:w-[64%]"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.15, delay: 0.95, ease: EASE_OUT }}
              >
                Stylish
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="ml-auto flex w-full justify-between text-[clamp(3rem,13vw,10.5rem)] md:w-[46%]"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.15, delay: 1.06, ease: EASE_OUT }}
              >
                {['N', 'Y', 'C'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </motion.span>
            </span>
          </h1>
        </div>

        <motion.p
          className="absolute bottom-6 left-6 z-20 text-[0.8125rem] md:bottom-12 md:left-12 md:text-[0.9375rem]"
          style={{ color: INK }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE_OUT }}
        >
          This is The One.
        </motion.p>
      </motion.div>
    </section>
  )
}

type Item = {
  src: string
  alt: string
  label: string
  span: string
  dir: 'left' | 'right' | 'up'
}

/** demo-salon.ru services block: ghost word, small heading, asymmetric grid. */
function Services({
  eyebrow,
  ghost,
  plate,
  ink,
  ghostColor,
  items,
}: {
  eyebrow: string
  ghost: string
  plate: string
  ink: string
  ghostColor: string
  items: Item[]
}) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: plate }}>
      {/* Oversized ghost word bleeding off the top, behind everything. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[0.16em] left-0 block w-full text-center text-[clamp(4rem,22vw,18rem)] leading-none font-semibold tracking-[-0.03em] select-none md:-top-[0.3em]"
        style={{ color: ghostColor }}
      >
        {ghost}
      </span>

      <div className="relative mx-auto w-full max-w-[92rem] px-5 md:px-10">
        <h2
          className="mb-10 text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold tracking-[0.06em] uppercase md:mb-16"
          style={{ color: ink }}
        >
          {eyebrow}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <div
              key={item.src}
              className={`flex items-stretch gap-3 ${item.span}`}
              style={{ color: ink }}
            >
              {i % 2 === 0 && <EdgeLabel side="left">{item.label}</EdgeLabel>}

              <RevealFrame direction={item.dir} delay={i * 0.08} className="flex-1 rounded-[2px]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </RevealFrame>

              {i % 2 === 1 && <EdgeLabel side="right">{item.label}</EdgeLabel>}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <a
            href={salon.phoneHref}
            className="group inline-flex items-center gap-4 px-8 py-4 text-[0.875rem] tracking-[0.04em] transition-transform duration-200 active:scale-[0.98]"
            style={{ background: ink, color: plate }}
          >
            Call to book
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export function ConceptPage() {
  return (
    <div style={{ background: OXBLOOD }}>
      <Loader plate={OXBLOOD} crest="light" />

      <a
        href="/"
        className="fixed right-4 bottom-4 z-50 rounded-full px-4 py-2 text-[0.8125rem] transition-opacity duration-200 hover:opacity-70"
        style={{ background: INK, color: OXBLOOD }}
      >
        Back to the main site
      </a>

      <main>
        <Hero />

        <Services
          eyebrow="Services"
          ghost="WOMEN"
          plate={CARD}
          ink="#1c1a1a"
          ghostColor="rgba(28,26,26,0.07)"
          items={[
            {
              src: '/img/work-bob.webp',
              alt: 'A precision blunt bob photographed from behind.',
              label: 'Cutting',
              span: 'aspect-4/3 lg:col-span-2 lg:row-span-2 lg:aspect-16/10',
              dir: 'left',
            },
            {
              src: '/img/service-gloss.webp',
              alt: 'A gloss treatment poured into a ceramic bowl.',
              label: 'Colour',
              span: 'aspect-4/3',
              dir: 'right',
            },
            {
              src: '/img/work-curls.webp',
              alt: 'Dense natural curls filling the frame.',
              label: 'Texture',
              span: 'aspect-4/3',
              dir: 'up',
            },
            {
              src: '/img/service-treatment.webp',
              alt: 'A client leaning back into the wash basin.',
              label: 'Treatment',
              span: 'aspect-4/3',
              dir: 'left',
            },
          ]}
        />

        <Services
          eyebrow="The studio"
          ghost="ROMAN"
          plate={DARK}
          ink="#f0ecea"
          ghostColor="rgba(240,236,234,0.06)"
          items={[
            {
              src: '/img/stylist-roman.webp?v=2',
              alt: 'Portrait of Roman Miyerov.',
              label: 'The chair',
              span: 'aspect-4/3 lg:col-span-2 lg:row-span-2 lg:aspect-16/10',
              dir: 'right',
            },
            {
              src: '/img/chair-mirror.webp',
              alt: 'An empty styling chair facing a tall mirror.',
              label: 'Chelsea',
              span: 'aspect-4/3',
              dir: 'left',
            },
            {
              src: '/img/salon-interior.webp',
              alt: 'The salon floor, chairs facing tall mirrors.',
              label: 'The room',
              span: 'aspect-4/3',
              dir: 'up',
            },
            {
              src: '/img/work-sectioning.webp',
              alt: 'Hair being sectioned with a fine tail comb.',
              label: 'Precision',
              span: 'aspect-4/3',
              dir: 'right',
            },
          ]}
        />

        <section
          className="px-5 py-24 text-center md:py-36"
          style={{ background: OXBLOOD, color: INK }}
        >
          <p style={CONCEPT_SERIF} className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02]">
            {salon.phone}
          </p>
          <p className="mt-6 text-[0.9375rem] opacity-75">
            {salon.venue}, {salon.street}, {salon.city}
          </p>
        </section>
      </main>
    </div>
  )
}
