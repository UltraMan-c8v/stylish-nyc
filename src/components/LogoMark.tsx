/**
 * Roman's crest, drawn from the traced vector in public/logo-mark.svg.
 *
 * Rendered as a CSS mask with a currentColor background rather than an <img>.
 * An externally referenced SVG cannot inherit colour from the page, so an
 * <img> would be stuck black and would disappear on every dark theme. Masking
 * it means the crest picks up the text colour and works in all eight palettes
 * from one file.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{
        maskImage: 'url(/logo-mark.svg)',
        WebkitMaskImage: 'url(/logo-mark.svg)',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  )
}
