import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Scissors } from '@phosphor-icons/react'
import { EASE_OUT } from '../lib/motion'

/**
 * Runs a scissor blade horizontally through a word, cutting every letter in
 * half, once the headline has settled.
 *
 * Motivated rather than decorative: the whole proposition is precision
 * cutting, and this puts the claim on the one word that carries it. It fires
 * once on load and replays on hover, so a returning visitor is not watching it
 * on a loop.
 *
 * Construction. The word is painted three times in the same place. The base
 * copy is the real, always-visible text and the only one in the accessibility
 * tree. Two clipped copies sit on top at zero opacity, one holding everything
 * above the cut and one everything below. During the pass the base fades out,
 * the halves fade in and step apart by a hair, then close again and hand back.
 * Because all three are identical glyphs at identical positions, the swap is
 * invisible.
 *
 * The blade travels on EASE_OUT, which is fast off the mark and decelerates
 * into the finish.
 */

/**
 * Height of the cut as a percentage of the line box.
 *
 * Measured, not guessed. In this face at this line-height the baseline sits at
 * 89.4% of the box and the x-height top at 39.4%, so the only band where the
 * C, the u and the t all carry mass is the middle of the x-height, at 64.5%.
 * Anything higher shaves the tops off instead of halving the letters.
 *
 * Scale-invariant: line-height is set in em, so the ratio holds at every
 * clamped headline size.
 */
const CUT_Y = 64

const TOP_HALF = `polygon(-30% -40%, 130% -40%, 130% ${CUT_Y}%, -30% ${CUT_Y}%)`
const BOTTOM_HALF = `polygon(-30% ${CUT_Y}%, 130% ${CUT_Y}%, 130% 140%, -30% 140%)`

/** Seconds. */
const BLADE = 0.72
const TOTAL = 1.02

export function SliceWord({ children, delay = 0 }: { children: string; delay?: number }) {
  const reduce = useReducedMotion()
  const [run, setRun] = useState(0)

  if (reduce) return <span>{children}</span>

  // The delay exists to let the headline reveal land first. A hover replay has
  // nothing to wait for, so it fires immediately: a second and a half of
  // nothing after the pointer arrives reads as broken, not as anticipation.
  const d = run === 0 ? delay : 0

  // Separation is perpendicular to the cut, so a horizontal blade pushes the
  // halves apart vertically. The last keyframe returns to zero: the word never
  // ends up displaced.
  const half = (clip: string, dy: number) => ({
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: [0, 0, 1, 1, 1, 0],
      y: [0, 0, 0, dy, 0, 0],
    },
    transition: {
      duration: TOTAL,
      delay: d,
      ease: 'linear' as const,
      times: [0, 0.44, 0.45, 0.62, 0.74, 1],
    },
    style: { clipPath: clip },
  })

  return (
    <span
      className="relative inline-block cursor-default align-baseline"
      onMouseEnter={() => setRun((n) => n + 1)}
    >
      {/* The only copy assistive tech sees. */}
      <motion.span
        key={`base-${run}`}
        className="block"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
        transition={{
          duration: TOTAL,
          delay: d,
          ease: 'linear',
          // Deliberately overlaps the halves rather than meeting them: two
          // identical copies on screen for a frame is invisible, a gap is not.
          times: [0, 0.44, 0.48, 0.72, 0.76, 1],
        }}
      >
        {children}
      </motion.span>

      <motion.span
        key={`t-${run}`}
        aria-hidden="true"
        className="absolute inset-0 block"
        {...half(TOP_HALF, -2.5)}
      >
        {children}
      </motion.span>

      <motion.span
        key={`b-${run}`}
        aria-hidden="true"
        className="absolute inset-0 block"
        {...half(BOTTOM_HALF, 2.5)}
      >
        {children}
      </motion.span>

      {/* The cut itself, drawn left to right behind the blade. Non-scaling
          stroke so the stretched viewBox does not fatten the line. */}
      <svg
        key={`line-${run}`}
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <motion.line
          x1={-18}
          y1={CUT_Y}
          x2={118}
          y2={CUT_Y}
          stroke="var(--accent)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0.5, 0] }}
          transition={{
            pathLength: { duration: BLADE, delay: d, ease: EASE_OUT },
            opacity: { duration: TOTAL, delay: d, times: [0, 0.08, 0.6, 1] },
          }}
        />
      </svg>

      {/* Travel is expressed against this wrapper, which spans the word, so the
          blade enters just before the first letter and leaves just after the
          last one at any word length or font size. */}
      <motion.span
        key={`s-${run}`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block"
        initial={{ x: '-18%' }}
        animate={{ x: '118%' }}
        transition={{ duration: BLADE, delay: d, ease: EASE_OUT }}
      >
        <motion.span
          className="absolute block -translate-x-1/2 -translate-y-1/2"
          style={{ left: 0, top: `${CUT_Y}%` }}
          initial={{ opacity: 0, rotate: -96 }}
          animate={{ opacity: [0, 1, 1, 0], rotate: [-96, -84] }}
          transition={{
            rotate: { duration: BLADE, delay: d, ease: EASE_OUT },
            opacity: { duration: BLADE + 0.2, delay: d, times: [0, 0.1, 0.72, 1] },
          }}
        >
          <Scissors className="size-[0.4em] text-accent" weight="light" />
        </motion.span>
      </motion.span>
    </span>
  )
}
