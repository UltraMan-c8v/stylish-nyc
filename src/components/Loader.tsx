import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Crest } from './Crest'

/**
 * Entrance curtain. The crest fills left to right, then the whole panel swipes
 * up off the top to hand over to the page.
 *
 * Shared by the main site and the concept page. Colours default to the theme
 * tokens, so on the main site the curtain is whatever palette is active; the
 * concept page passes its own fixed pair.
 *
 * Under one second end to end, which is the ceiling for anything standing
 * between a visitor and the content. The fill runs 620ms and the swipe 620ms,
 * overlapping, so the panel is gone at about 950ms.
 *
 * The fill is two copies of the crest stacked: a dim one always visible, and a
 * full-strength one clipped by an inset that opens from the left. Animating
 * the clip rather than a width keeps the mark's geometry fixed, so the lion
 * does not stretch as it fills.
 *
 * It renders nothing at all under prefers-reduced-motion, and it never blocks
 * the page underneath: the page is already mounted and painted behind it.
 */

const CREST_FILL = 0.62
const HOLD = 0.12

export function Loader({
  plate = 'var(--canvas)',
  crest,
}: {
  /** Defaults follow the active theme, so the main site needs no arguments. */
  plate?: string
  /**
   * Pin the crest polarity. Only the concept page needs it: it paints its own
   * colours inline and carries no data-theme for the crest to read.
   */
  crest?: 'light' | 'dark'
} = {}) {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setDone(true), (CREST_FILL + HOLD) * 1000)
    return () => clearTimeout(t)
  }, [reduce])

  if (reduce) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: plate }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative size-16 md:size-20">
            {/* Ghost of the mark, so something is present from frame one. */}
            <Crest className="absolute inset-0 opacity-25" force={crest} />

            {/* The fill, opening left to right. The clip sits on a wrapper
                rather than on the crest, because the crest may be an image and
                an image cannot carry both the clip and its own object-fit
                without one fighting the other. */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 block"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: CREST_FILL, ease: [0.65, 0, 0.35, 1] }}
            >
              <Crest className="size-full" force={crest} />
            </motion.span>
          </div>

          <span className="sr-only">Loading</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
