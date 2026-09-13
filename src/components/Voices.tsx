import { voices } from '../data/content'
import { Reveal } from './Reveal'

/**
 * Two quotes set as display type, not as cards with avatars and star ratings.
 * Each is under three lines, which is the whole point of a landing page quote:
 * it has to land in a glance.
 *
 * Attribution uses a plain hyphen. Quote marks are real typographic ones.
 */
export function Voices() {
  return (
    <section className="border-t border-line py-24 md:py-36">
      <div className="shell grid gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
        {voices.map((voice, i) => (
          <Reveal as="figure" key={voice.name} delay={i * 0.1}>
            <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.24] tracking-[-0.02em]">
              &ldquo;{voice.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-baseline gap-3 border-t border-line pt-5 text-sm">
              <span className="text-ink">{voice.name}</span>
              <span className="text-faint">{voice.detail}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
