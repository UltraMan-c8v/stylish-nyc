import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { nav, salon } from '../data/content'
import { CallLink } from './CallLink'
import { ThemePicker } from './ThemePicker'
import { LogoStacked } from './Logo'
import { LogoMark } from './LogoMark'
import { EASE_OUT } from '../lib/motion'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const reduce = useReducedMotion()
  const sentinel = useRef<HTMLDivElement>(null)

  // IntersectionObserver rather than a scroll listener: one callback at the
  // threshold instead of a handler running on every scroll frame.
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: '0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-6 w-full" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-invert focus:px-4 focus:py-2 focus:text-on-invert"
      >
        Skip to content
      </a>

      <header
        data-surface
        className={
          'fixed inset-x-0 top-0 z-50 h-16 border-b transition-colors duration-300 md:h-[68px] ' +
          (lifted
            ? 'border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent')
        }
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          {/* Crest and wordmark locked up, divided by a hairline. The crest
              carries the brand at small sizes; the wordmark carries the name. */}
          <a href="/" className="flex shrink-0 items-center gap-2.5 text-ink md:gap-3" aria-label="Stylish NYC, home">
            <LogoMark className="size-8 md:size-9" />
            <span aria-hidden="true" className="h-7 w-px bg-line-strong md:h-8" />
            <LogoStacked title={null} className="h-8 w-auto md:h-9" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-2 text-[0.9375rem] text-muted transition-colors duration-200 hover:text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-[320ms] after:ease-[cubic-bezier(0.23,1,0.32,1)] hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <ThemePicker />

            {/* Wrapped rather than given `hidden` directly: the button's base
                class already sets inline-flex, and Tailwind orders display
                utilities by name, so `hidden` on the same element loses. */}
            <span className="hidden sm:block">
              <CallLink size="sm" />
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex size-11 cursor-pointer items-center justify-center lg:hidden"
            >
              {/* Two bars rotating into an X rather than swapping glyphs.
                  Both sit at the same origin and separate by translate, so the
                  morph runs entirely on transform and never touches layout. */}
              <span className="relative block h-3 w-5">
                <span
                  className={
                    'absolute top-1/2 left-0 block h-px w-full bg-ink transition-[translate,rotate] duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] ' +
                    (open ? 'translate-y-0 rotate-45' : '-translate-y-[5px] rotate-0')
                  }
                />
                <span
                  className={
                    'absolute top-1/2 left-0 block h-px w-full bg-ink transition-[translate,rotate] duration-[320ms] ease-[cubic-bezier(0.32,0.72,0,1)] ' +
                    (open ? 'translate-y-0 -rotate-45' : 'translate-y-[5px] rotate-0')
                  }
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pt-16 pb-12">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE_OUT }}
                  className="font-display text-[clamp(2.75rem,13vw,4rem)] leading-[1.08] tracking-[-0.03em]"
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT }}
                className="mt-10 flex flex-col gap-4 border-t border-line pt-8"
              >
                <CallLink withArrow className="self-start" onOpen={() => setOpen(false)} />
                <a href={salon.phoneHref} className="text-muted transition-colors hover:text-ink">
                  {salon.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
