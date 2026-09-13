import { createContext, useContext } from 'react'

/**
 * Seven palettes. The ids match the `data-theme` values in index.css.
 *
 * `canvas` and `accent` are what the picker paints, split diagonally across a
 * circle. They are duplicated here rather than read from CSS because the picker
 * draws all seven at once and only the active theme's custom properties are
 * resolvable at any moment.
 *
 * Names are the colour, one word each. "Onyx and crimson" was accurate and
 * unreadable in a 130px cell; "Rouge" says the same thing and belongs in a
 * salon. Keep them to a single word if any are ever added.
 *
 * `mode` groups them in the picker. Somebody hunting for light mode should not
 * have to work out which of seven swatches is a pale one.
 *
 * There used to be a second near-white palette, Paper. It sat one or two
 * values per channel away from Linen, which meant two swatches nobody could
 * tell apart and a choice that did nothing. A palette has to be visibly a
 * different palette or it is noise.
 */
export const THEMES = [
  // Dark. Roman's choice leads.
  { id: 'onyx-crimson', label: 'Rouge', mode: 'dark', canvas: '#0b0a0a', accent: '#e0565c' },
  { id: 'noir', label: 'Noir', mode: 'dark', canvas: '#0b0b0c', accent: '#b9b9be' },
  { id: 'onyx-gold', label: 'Gilt', mode: 'dark', canvas: '#0a0a0b', accent: '#d8b35a' },
  { id: 'forest', label: 'Emerald', mode: 'dark', canvas: '#0a1310', accent: '#c6a05a' },
  { id: 'bordeaux', label: 'Bordeaux', mode: 'dark', canvas: '#130a0c', accent: '#d8a2a8' },

  // Light.
  { id: 'chalk', label: 'Linen', mode: 'light', canvas: '#f2f0ed', accent: '#57554e' },
  { id: 'ivory-gold', label: 'Champagne', mode: 'light', canvas: '#f6f3ec', accent: '#7a5c14' },
] as const

export type Theme = (typeof THEMES)[number]['id']
export type ThemeMode = (typeof THEMES)[number]['mode']

export const THEME_IDS = THEMES.map((t) => t.id) as readonly Theme[]

/**
 * Roman chose crimson on onyx, so it is the brand and it loads for everyone.
 *
 * Deliberately not conditional on the visitor's OS light-mode preference any
 * more. A brand colour is a decision the owner made; opening on a different
 * palette because somebody's laptop is set to light would mean half of all
 * visitors never see the salon the way he intended it. The picker is one tap
 * away in the nav for anyone who wants otherwise, and the choice is remembered.
 */
export const DEFAULT_THEME: Theme = 'onyx-crimson'
export const LIGHT_THEME: Theme = 'chalk'

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
