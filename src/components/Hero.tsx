import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ButtonLink } from './Button'
import { CallLink } from './CallLink'
import { SliceWord } from './SliceWord'
import { EASE_OUT } from '../lib/motion'

const HEADLINE = ['Cut to keep', 'its shape.']

/** The headline reveal finishes around 1.06s; the blade follows it. */
const SLICE_DELAY = 1.15

/**
 * Asymmetric split hero: type left, full-bleed portrait right.
 *
 * Four text elements total, which is the ceiling: headline, subtext, and two
 * CTAs. No trust strip, no tagline under the buttons, no scroll cue. Those
 * belong to the sections underneath.
 */
export function Hero() {
  const reduce = useReducedMotion()

  // The mask that makes the headline slide up from nothing would also clip the
  // blade travelling past the cap height, so it is released once the reveal has
  // finished and it has no more work to do.
  const [masked, setMasked] = useState(true)
  useEffect(() => {
    if (reduce) {
      setMasked(false)
      return
    }
    const t = setTimeout(() => setMasked(false), 1150)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-24 pb-14 md:justify-center md:pb-24"
    >
      <div className="shell grid w-full items-center gap-y-10 md:grid-cols-12 md:gap-x-10">
        <div className="relative z-10 md:col-span-7 lg:col-span-6">
          <h1 className="font-display text-[clamp(3.25rem,8.6vw,7.75rem)] leading-[0.92] tracking-[-0.035em]">
            {HEADLINE.map((line, i) => (
              <span
                key={line}
                className={'block pb-[0.06em] ' + (masked ? 'overflow-hidden' : 'overflow-visible')}
              >
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.06 + i * 0.09, ease: EASE_OUT }}
                >
                  {i === 0 ? (
                    <>
                      <SliceWord delay={SLICE_DELAY}>Cut</SliceWord> to keep
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE_OUT }}
            className="measure mt-7 text-[1.0625rem] text-muted md:mt-9 md:text-lg"
          >
            A Chelsea studio built around precision cutting, considered colour, and hair that still
            works on day five.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE_OUT }}
            className="mt-9 flex flex-wrap items-center gap-3 md:mt-11"
          >
            <CallLink withArrow />
            <ButtonLink href="#work" variant="ghost">
              See the work
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed to the right edge on desktop; a calm banded strip on mobile
          so the headline is never fighting the portrait for the first screen. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[46vh] md:inset-y-0 md:left-auto md:h-auto md:w-[46vw] lg:w-[42vw]"
      >
        <img
          src="/img/hero-editorial.webp"
          alt="An editorial studio portrait: dark hair rolled up into height at the crown and swept back, in a metallic dress."
          width={1334}
          height={2000}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-[54%_16%] md:object-[58%_20%]"
        />
        {/* Gradient scrim so the type stays legible where it overlaps. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-canvas from-0% via-canvas/45 via-30% to-transparent to-72% md:bg-gradient-to-r md:from-canvas md:from-0% md:via-canvas/40 md:via-22% md:to-transparent md:to-58%"
        />

        {/* Second scrim, top down, for the header rather than the headline.
            This portrait was shot on a white sweep, so the upper right of the
            frame is the brightest thing on the page. The nav sits on it while
            it is still transparent, and its controls are coloured for a dark
            ground: without this they land grey on white and all but vanish. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-canvas/90 to-transparent md:h-32"
        />
      </motion.div>
    </section>
  )
}
