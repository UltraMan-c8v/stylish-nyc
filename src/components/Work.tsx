import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { work } from '../data/content'
import { Reveal } from './Reveal'
import { RollingHeading } from './RollingHeading'

/**
 * Horizontal scroll-snap strip.
 *
 * Native scrolling does the work, so it is already keyboard and trackpad
 * reachable. The arrow buttons exist because a pointer user on desktop has no
 * obvious affordance otherwise, and they satisfy the rule that no interaction
 * may be drag-only. They disable at each end rather than wrapping, so the
 * control always tells the truth about what it will do.
 */
export function Work() {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    sync()
    // Scroll events on this element only, not the window, and passive so they
    // never block the compositor.
    el.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  const nudge = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section id="work" className="py-24 md:py-36">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <RollingHeading className="font-display text-[clamp(2.25rem,5vw,4rem)]">Recent work</RollingHeading>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Scroll to previous work"
              className="flex size-11 cursor-pointer items-center justify-center rounded-[2px] border border-control text-ink transition-[color,border-color,transform] duration-200 hover:border-ink active:scale-[0.96] disabled:cursor-default disabled:border-line disabled:text-faint disabled:active:scale-100"
            >
              <ArrowLeft size={17} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Scroll to next work"
              className="flex size-11 cursor-pointer items-center justify-center rounded-[2px] border border-control text-ink transition-[color,border-color,transform] duration-200 hover:border-ink active:scale-[0.96] disabled:cursor-default disabled:border-line disabled:text-faint disabled:active:scale-100"
            >
              <ArrowRight size={17} weight="light" />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <ul
          ref={track}
          data-lenis-prevent
          className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 md:mt-14 md:gap-6 md:px-10 xl:px-16"
          style={{ scrollPaddingInline: '1.25rem' }}
        >
          {work.map((item) => (
            <li
              key={item.src}
              className="group w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[25rem]"
            >
              <figure>
                <div className="overflow-hidden rounded-[2px] bg-surface">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1100}
                    height={1467}
                    loading="lazy"
                    decoding="async"
                    className="aspect-3/4 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <figcaption className="mt-4 text-sm text-muted">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
