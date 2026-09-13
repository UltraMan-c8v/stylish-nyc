/**
 * Three logo directions, drawn as SVG rather than generated as images.
 *
 * They are set in Bodoni Moda, the same Didone the page already loads, so the
 * mark and the headlines are the same voice. Everything strokes and fills with
 * `currentColor`, which means one file works on both themes and inverts
 * correctly on a photograph without a second asset.
 *
 * Letter-spacing pushes a trailing gap after the last character, so centred
 * text is nudged left by half a space to sit optically centred.
 */

type LogoProps = {
  className?: string
  /** Accessible name. Pass null when an adjacent visible label already names it. */
  title?: string | null
}

const DISPLAY = "'Bodoni Moda Variable', 'Bodoni Moda', Georgia, serif"
const SANS = "'Geist Variable', 'Geist', ui-sans-serif, system-ui, sans-serif"

function Title({ title }: { title?: string | null }) {
  if (title === null) return null
  return <title>{title ?? 'Stylish NYC'}</title>
}

/**
 * A. Stacked masthead. The fashion-magazine move: two lines, one hairline.
 *
 * All three elements are pinned to one measure. STYLISH and the rule both run
 * the full 176 units, so the logo's visual left edge is the S itself and it
 * sits flush with the page gutter. NYC is tracked to exactly half that width
 * and centred on it, which reads as a deliberate label rather than a smaller
 * word floating under a bigger one.
 *
 * Widths are set with `textLength` rather than `letter-spacing`. That fixes the
 * tracking to the measure instead of the glyph widths, so the lockup is
 * identical whether Bodoni has loaded or the Georgia fallback is still up, and
 * the nav does not reflow when the webfont arrives.
 */
export function LogoStacked({ className, title }: LogoProps) {
  return (
    <svg
      viewBox="0 0 176 70"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden={title === null || undefined}
    >
      <Title title={title} />
      <text
        x={0}
        y={31}
        fontFamily={DISPLAY}
        fontSize={30}
        textLength={176}
        lengthAdjust="spacing"
      >
        STYLISH
      </text>
      <line x1={0} y1={42} x2={176} y2={42} stroke="currentColor" strokeWidth={1} />
      <text
        x={44}
        y={64}
        fontFamily={DISPLAY}
        fontSize={17}
        textLength={88}
        lengthAdjust="spacing"
      >
        NYC
      </text>
    </svg>
  )
}

/** B. Boxed monogram. Reads at favicon size, which the other two do not. */
export function LogoMonogram({ className, title }: LogoProps) {
  return (
    <svg
      viewBox="0 0 168 176"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden={title === null || undefined}
    >
      <Title title={title} />
      <rect
        x={34}
        y={6}
        width={100}
        height={100}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text x={84} y={87} textAnchor="middle" fontFamily={DISPLAY} fontSize={86}>
        S
      </text>
      <text
        x={81.5}
        y={144}
        textAnchor="middle"
        fontFamily={SANS}
        fontSize={13}
        letterSpacing={5}
        fontWeight={400}
      >
        STYLISH NYC
      </text>
    </svg>
  )
}

/** C. Shear mark over a single-line wordmark. */
export function LogoMark({ className, title }: LogoProps) {
  return (
    <svg
      viewBox="0 0 264 128"
      className={className}
      fill="currentColor"
      role="img"
      aria-hidden={title === null || undefined}
    >
      <Title title={title} />
      <g stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round">
        {/* Two blades crossing, two handles. Shears reduced to four strokes. */}
        <line x1={118} y1={8} x2={144} y2={56} />
        <line x1={146} y1={8} x2={120} y2={56} />
        <circle cx={116} cy={62} r={6.5} />
        <circle cx={148} cy={62} r={6.5} />
      </g>
      <text
        x={128}
        y={114}
        textAnchor="middle"
        fontFamily={DISPLAY}
        fontSize={23}
        letterSpacing={8}
      >
        STYLISH NYC
      </text>
    </svg>
  )
}
