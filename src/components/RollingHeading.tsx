import { motion, useReducedMotion } from 'motion/react'
import { EASE_OUT } from '../lib/motion'

/**
 * Combination-lock heading. Each letter rolls up through a short reel of
 * glyphs and lands on the right one, staggered left to right.
 *
 * The reel is built from letters near the target in the alphabet rather than
 * from random characters. Random glyphs read as noise; neighbouring ones read
 * as a dial spinning past, which is the effect being aimed at.
 *
 * Every character is a fixed-height overflow-hidden box, so the reel is
 * clipped to exactly one line and the heading occupies its final size from the
 * first frame. Nothing reflows as it lands.
 */

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const REEL = 5

function reelFor(char: string) {
  const upper = char.toUpperCase()
  const at = ALPHA.indexOf(upper)
  if (at === -1) return [char]

  const out: string[] = []
  for (let i = REEL; i > 0; i--) {
    const pick = ALPHA[(at - i * 5 + ALPHA.length * 3) % ALPHA.length]
    out.push(char === upper ? pick : pick.toLowerCase())
  }
  out.push(char)
  return out
}

export function RollingHeading({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
}: {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  delay?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) return <Tag className={className}>{children}</Tag>

  const chars = [...children]

  return (
    <Tag className={className}>
      {/* The real string, for assistive tech and for copy and paste. The reels
          above it are decorative. */}
      <span className="sr-only">{children}</span>

      {/* select-none so copying the heading picks up the real string above
          rather than the reel glyphs. */}
      <span aria-hidden="true" className="inline-flex flex-wrap select-none">
        {chars.map((char, i) => {
          if (char === ' ') return <span key={i} className="inline-block w-[0.28em]" />

          const reel = reelFor(char)
          const steps = reel.length - 1

          return (
            <span
              key={i}
              className="relative inline-block overflow-hidden align-bottom"
              style={{ height: '1.08em', lineHeight: '1.08em' }}
            >
              {/* Sizes the box to the final glyph so nothing shifts on landing. */}
              <span className="invisible block">{char}</span>

              <motion.span
                className="absolute inset-x-0 top-0 block will-change-transform"
                initial={{ y: `-${steps * 100}%` }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * 0.035,
                  ease: EASE_OUT,
                }}
              >
                {reel.map((glyph, r) => (
                  <span key={r} className="block" style={{ height: '1.08em' }}>
                    {glyph}
                  </span>
                ))}
              </motion.span>
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
