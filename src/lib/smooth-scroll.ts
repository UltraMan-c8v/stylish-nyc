import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth scroll, which is the other half of why 375.studio feels the way
 * it does. Scrub-linked animations look mechanical against a native wheel step
 * and fluid against an interpolated one.
 *
 * Gated three ways, because scroll hijacking is hostile when it is wrong:
 *   - off entirely under prefers-reduced-motion
 *   - off for coarse pointers, so native touch momentum is never replaced
 *   - anchor jumps and Escape still behave normally
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const lenis = new Lenis({
      duration: 1.05,
      // Matches --ease-out closely enough that JS and CSS motion agree.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
