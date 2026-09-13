import { Crest } from './Crest'

/**
 * Kept as the name the rest of the site imports. The choice between Roman's
 * original rendered artwork and the traced silhouette lives in Crest.tsx, so
 * that decision is made in exactly one place.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return <Crest className={className} />
}
