import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  /** Seconds. Used to cascade sibling reveals; keep steps around 0.06. */
  delay?: number
  /** Travel distance in px. Small by default: this is arrival, not entrance. */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'figure'
}

/**
 * Scroll arrival for a block of content.
 *
 * Purpose: sequence. Sections are read top to bottom, and a short offset
 * settle tells the reader where the current block begins without stalling
 * them. Fires once. Collapses to a plain render under reduced motion, which
 * is why `initial` becomes `false` rather than a zero-duration animation.
 */
export function Reveal({ children, delay = 0, y = 20, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  )
}
