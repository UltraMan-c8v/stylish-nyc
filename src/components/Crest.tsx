/**
 * Roman's crest.
 *
 * PREVIEW SWITCH. `ORIGINAL` chooses between two ways of drawing the same
 * lion, and both are kept because they are genuinely different trade-offs:
 *
 *   false - the traced vector in public/logo-mark.svg, painted as a CSS mask
 *           over currentColor. One file, sharp at any size, and it takes the
 *           text colour of whatever palette is active. It is a flat silhouette:
 *           tracing keeps the outline and throws away everything inside it.
 *
 *   true  - Roman's original rendered artwork, as two raster files. Keeps the
 *           moulded 3D shading, which is the entire reason he likes it. Cannot
 *           be recoloured, because recolouring is exactly what destroys the
 *           shading, so it ships in both polarities and CSS picks one per
 *           palette.
 *
 * Flip the constant to switch the whole site. Nothing else has to change.
 */

const ORIGINAL = true

const MASK = {
  maskImage: 'url(/logo-mark.svg)',
  WebkitMaskImage: 'url(/logo-mark.svg)',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
} as const

export function Crest({
  className = '',
  force,
}: {
  className?: string
  /**
   * Pin the polarity instead of following the palette. The concept page sets
   * its own colours inline and never carries a data-theme, so it has to say
   * which version it needs.
   */
  force?: 'light' | 'dark'
}) {
  if (!ORIGINAL) {
    return <span aria-hidden="true" className={`block bg-current ${className}`} style={MASK} />
  }

  // A single forced polarity renders one file and skips the swap entirely.
  if (force) {
    return (
      <span aria-hidden="true" className={`block ${className}`}>
        <img
          src={force === 'light' ? '/img/crest-light.webp' : '/img/crest-dark.webp'}
          alt=""
          className="crest-img size-full object-contain"
        />
      </span>
    )
  }

  return (
    <span aria-hidden="true" className={`block ${className}`}>
      {/* Both ship; CSS shows one. Toggling `display` rather than swapping the
          `src` means neither has to be fetched at the moment a visitor changes
          palette, so the crest never blinks out mid-transition. */}
      <img src="/img/crest-light.webp" alt="" className="crest-img crest-on-dark size-full object-contain" />
      <img src="/img/crest-dark.webp" alt="" className="crest-img crest-on-light size-full object-contain" />
    </span>
  )
}
