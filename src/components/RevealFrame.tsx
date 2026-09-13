import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * The demo-salon.ru image reveal: a panel slides in while the picture inside it
 * appears to stay put and un-crop.
 *
 * Their DOM shows no clip-path anywhere, just `transition: transform` at 1.2s
 * on cubic-bezier(0.215, 0.61, 0.355, 1). The trick is a counter-translation.
 * The panel travels one way; the image inside travels the same distance the
 * other way. The two cancel, so the photograph holds still in the viewport
 * while the panel's edge wipes across it. Translating the image alone would
 * smear it sideways, and animating a clip-path repaints far more.
 *
 * Three levels, and the outermost one matters more than it looks:
 *
 *   1. a static wrapper that clips and owns the in-view detection
 *   2. the panel, translating in from the given edge
 *   3. the content, counter-translating by the same amount
 *
 * The static wrapper exists because IntersectionObserver reports an element's
 * position *after* transforms. A panel parked at x:-100% sits entirely outside
 * the viewport horizontally, so it never registers as visible and its own
 * whileInView can never fire. It would sit off-screen forever. Detection has to
 * live on something that does not move.
 *
 * Both moving parts are driven by variants propagated from the wrapper rather
 * than by their own whileInView, so they are guaranteed to start on the same
 * frame. Any drift between them shows up immediately as the image sliding.
 */

const EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1] as const
const DURATION = 1.2

type Direction = 'left' | 'right' | 'up'
type Offset = { x?: string; y?: string }

const OFFSETS: Record<Direction, { panel: Offset; content: Offset }> = {
  left: { panel: { x: '-100%' }, content: { x: '100%' } },
  right: { panel: { x: '100%' }, content: { x: '-100%' } },
  up: { panel: { y: '100%' }, content: { y: '-100%' } },
}

export function RevealFrame({
  children,
  direction = 'left',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>

  const { panel, content } = OFFSETS[direction]
  const transition = { duration: DURATION, delay, ease: EASE_OUT_CUBIC }

  const panelVariants: Variants = { hidden: panel, shown: { x: 0, y: 0, transition } }
  const contentVariants: Variants = { hidden: content, shown: { x: 0, y: 0, transition } }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={panelVariants} className="size-full">
        <motion.div variants={contentVariants} className="size-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
