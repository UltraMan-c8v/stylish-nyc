import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  ThemeContext,
  isTheme,
  type Theme,
} from './theme-context'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME
  // The inline script in each HTML head has already resolved stored preference
  // against the OS setting before first paint, so read what it decided.
  const attr = document.documentElement.getAttribute('data-theme')
  return isTheme(attr) ? attr : DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  // Reflect the theme onto the document, and nothing else. Writing to storage
  // here as well, which is what this used to do, meant the default got saved
  // on first paint as though the visitor had chosen it. Persistence belongs to
  // the act of choosing, so it lives in setTheme.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = useCallback(
    (next: Theme, origin?: { x: number; y: number }) => {
      if (next === theme) return

      try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        // Private browsing. The in-memory theme still applies this session.
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const supported = typeof document.startViewTransition === 'function'

      if (!supported || reduced || !origin) {
        setThemeState(next)
        return
      }

      // A circular wipe out of the control that was pressed. Motivated: it
      // shows which control caused the change and where it came from.
      const transition = document.startViewTransition(() => {
        setThemeState(next)
      })

      transition.ready
        .then(() => {
          const { x, y } = origin
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          )
          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
            },
            {
              duration: 620,
              easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {
          // A skipped transition still committed the state change above.
        })
    },
    [theme],
  )

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
