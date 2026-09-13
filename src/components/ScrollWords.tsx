import { useRef, type ElementType } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

/**
 * Words sliding in from the right, scrubbed against scroll position.
 *
 * Modelled on how 375.studio does it. The key detail, and the thing that makes
 * it feel expensive rather than like a canned entrance, is that the stagger is
 * *positional* rather than timed: every word carries its own offset, and words
 * further along the line start further right and more transparent. Inspecting
 * their DOM mid-scroll shows exactly that, one word at translate3d(266px) and
 * 0.72 opacity, the next at 377px and 0.60, the next at 519px and 0.45.
 *
 * Because it is tied to scroll progress rather than to a timer, it tracks the
 * scroll wheel both ways and settles wherever the reader stops. A one-shot
 * `whileInView` cannot do that.
 *
 * Lines are declared explicitly rather than measured, so nothing has to be
 * re-split on resize and there is no layout thrash.
 */

type Props = {
  /** One string per visual line. */
  lines: readonly string[]
  as?: ElementType
  className?: string
  /** How far the last word of a line starts out, in px. */
  distance?: number
}

function Word({
  children,
  progress,
  index,
  count,
  distance,
}: {
  children: string
  progress: MotionValue<number>
  index: number
  count: number
  distance: number
}) {
  // Later words travel further and resolve later, which is what produces the
  // trailing-comet look rather than a block of text moving as one.
  const from = distance * (0.35 + (0.65 * index) / Math.max(count - 1, 1))
  const start = Math.min(index * 0.05, 0.4)
  const end = Math.min(start + 0.55, 1)

  const x = useTransform(progress, [start, end], [from, 0])
  const opacity = useTransform(progress, [start, end], [0, 1])

  return (
    <motion.span style={{ x, opacity }} className="inline-block will-change-transform">
      {children}
    </motion.span>
  )
}

export function ScrollWords({ lines, as, className, distance = 320 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    // Begins as the block enters the lower third and completes well before it
    // leaves, so the reader never sees it mid-flight at rest.
    offset: ['start 0.92', 'start 0.42'],
  })

  const Tag = (as ?? 'div') as ElementType

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line) => {
        const words = line.split(' ')
        return (
          <span key={line} className="block">
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <Word
                  progress={scrollYProgress}
                  index={i}
                  count={words.length}
                  distance={distance}
                >
                  {word}
                </Word>
                {i < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}
