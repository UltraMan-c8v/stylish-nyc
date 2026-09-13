import { createContext, useContext } from 'react'

/**
 * Seven palettes. The ids match the `data-theme` values in index.css.
 *
 * `swatch` is what the picker paints: canvas behind, accent in front. It is
 * duplicated here rather than read from CSS because the picker has to draw all
 * seven at once, and only the active theme's variables are resolvable.
 */
export const THEMES = [
  { id: 'noir', label: 'Noir', canvas: '#0b0b0c', accent: '#edede9' },
  { id: 'paper', label: 'Paper', canvas: '#f2f1ee', accent: '#131315' },
  { id: 'chalk', label: 'Chalk', canvas: '#f2f0ed', accent: '#1a1917' },
  { id: 'onyx-gold', label: 'Onyx and gold', canvas: '#0a0a0b', accent: '#d8b35a' },
  { id: 'onyx-crimson', label: 'Onyx and crimson', canvas: '#0b0a0a', accent: '#e0565c' },
  { id: 'ivory-gold', label: 'Ivory and gold', canvas: '#f6f3ec', accent: '#7a5c14' },
  { id: 'forest', label: 'Forest and brass', canvas: '#0a1310', accent: '#c6a05a' },
  { id: 'bordeaux', label: 'Bordeaux', canvas: '#130a0c', accent: '#d8a2a8' },
] as const

export type Theme = (typeof THEMES)[number]['id']

export const THEME_IDS = THEMES.map((t) => t.id) as readonly Theme[]

export const DEFAULT_THEME: Theme = 'noir'
export const LIGHT_THEME: Theme = 'paper'

export const THEME_STORAGE_KEY = 'snyc-theme'

export function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value)
}

export type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
