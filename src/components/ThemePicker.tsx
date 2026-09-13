import { useEffect, useRef, useState } from 'react'
import { Check, Palette } from '@phosphor-icons/react'
import { THEMES, useTheme, type ThemeMode } from '../lib/theme-context'

/**
 * Palette picker.
 *
 * Kept in the shipped site at Roman's request. The salon opens on Rouge, his
 * choice, and a visitor can change it; the choice is stored and applied before
 * first paint on every later visit.
 *
 * One palette per row rather than a grid. A grid was denser but it made every
 * cell as wide as the longest name and put two swatches side by side, which is
 * the arrangement most likely to be read as one colour pair rather than two
 * separate options.
 *
 * Built as a plain popover rather than a native <dialog>: it is a menu anchored
 * to a trigger, not a modal, so it should not trap focus or inert the page.
 * Escape and outside-click close it, and focus returns to the trigger.
 */

const GROUPS: { mode: ThemeMode; label: string }[] = [
  { mode: 'dark', label: 'Dark' },
  { mode: 'light', label: 'Light' },
]

/**
 * The theme in miniature: a circle split on the diagonal, canvas against
 * accent.
 *
 * The ring is drawn in the *current* theme's line colour rather than the
 * previewed one. It is chrome, not content, and it has to separate a near-black
 * swatch from a near-black popover. Taking it from the swatch itself would make
 * every dark palette disappear into the panel behind it.
 */
function Swatch({ canvas, accent }: { canvas: string; accent: string }) {
  return (
    <span
      aria-hidden="true"
      className="block size-5 shrink-0 rounded-full border border-control"
      style={{ background: `linear-gradient(135deg, ${canvas} 0 50%, ${accent} 50% 100%)` }}
    />
  )
}

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
        className="flex size-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-ink"
      >
        <Palette size={18} weight="light" aria-hidden="true" />
      </button>

      {/* Width capped against the viewport rather than merely set. The panel is
          anchored to a trigger that sits near the right edge, so on the
          narrowest phones a fixed width would hang off the screen and clip the
          labels. min() makes that impossible without measuring anything. */}
      {open && (
        <div
          role="menu"
          aria-label="Colour theme"
          className="absolute top-full right-0 z-50 mt-2 w-[min(11.5rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-surface p-1.5 shadow-[0_18px_50px_rgb(0_0_0_/_0.35)]"
        >
          {GROUPS.map((group, g) => (
            <div key={group.mode} className={g > 0 ? 'mt-1.5 border-t border-line pt-1.5' : ''}>
              <p className="px-2.5 pt-1.5 pb-1 font-mono text-[0.5625rem] tracking-[0.16em] text-faint uppercase">
                {group.label}
              </p>

              {THEMES.filter((t) => t.mode === group.mode).map((t) => {
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
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 hover:bg-canvas"
                  >
                    <Swatch canvas={t.canvas} accent={t.accent} />

                    <span
                      className={
                        'flex-1 text-[0.8125rem] leading-none ' +
                        (active ? 'text-ink' : 'text-muted')
                      }
                    >
                      {t.label}
                    </span>

                    {active && (
                      <Check size={12} weight="bold" aria-hidden="true" className="text-accent" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
