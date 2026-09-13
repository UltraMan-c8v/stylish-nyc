import { useEffect, useRef, useState } from 'react'
import { Check, Palette } from '@phosphor-icons/react'
import { THEMES, useTheme } from '../lib/theme-context'

/**
 * Palette picker. Temporary, for choosing a direction.
 *
 * Once a theme is settled on, delete this component, drop it from the nav, and
 * hard-set the winner as the default in index.css and in the inline script in
 * each HTML head. It is not something a salon client should ship.
 *
 * Built as a plain popover rather than a native <dialog>: it is a menu anchored
 * to a trigger, not a modal, so it should not trap focus or inert the page.
 * Escape and outside-click close it, and focus returns to the trigger.
 */
export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      trigger.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Change colour theme"
        className="flex size-11 cursor-pointer items-center justify-center rounded-[2px] text-muted transition-colors duration-200 hover:text-ink"
      >
        <Palette size={18} weight="light" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Colour theme"
          className="absolute top-full right-0 z-50 mt-2 w-60 rounded-[2px] border border-line-strong bg-surface p-2 shadow-[0_18px_50px_rgb(0_0_0_/_0.35)]"
        >
          <p className="px-3 pt-2 pb-3 font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
            Theme
          </p>

          {THEMES.map((t) => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={(event) => {
                  const r = event.currentTarget.getBoundingClientRect()
                  setTheme(t.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
                  setOpen(false)
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-[2px] px-3 py-2.5 text-left text-[0.9375rem] text-ink transition-colors duration-150 hover:bg-canvas"
              >
                {/* Canvas behind, accent in front: the theme in miniature. */}
                <span
                  aria-hidden="true"
                  className="relative block size-5 shrink-0 rounded-[2px] border border-line-strong"
                  style={{ background: t.canvas }}
                >
                  <span
                    className="absolute right-1 bottom-1 block size-2 rounded-full"
                    style={{ background: t.accent }}
                  />
                </span>

                <span className="flex-1">{t.label}</span>

                {active && <Check size={14} weight="bold" aria-hidden="true" className="text-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
