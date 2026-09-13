/**
 * Shared motion constants.
 *
 * Kept out of the component files so a fast-refresh boundary is not broken by
 * exporting non-components alongside components.
 */

/** Mirrors --ease-out in index.css so CSS and JS motion share one rhythm. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** iOS drawer curve. Used for the theme wipe and the hamburger morph. */
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const
