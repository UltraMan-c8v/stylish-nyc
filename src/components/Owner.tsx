import { owner } from '../data/content'
import { Reveal } from './Reveal'
import { RollingHeading } from './RollingHeading'

/**
 * Replaces the old three-up stylist grid. The studio is one person, so this is
 * an editorial spread rather than a roster: one tall portrait against the copy
 * in its own column.
 *
 * A single frame, not two. The second, smaller portrait that used to step in
 * beneath it was a different generated likeness of the same man, and two
 * near-identical faces on one page invited the comparison rather than
 * surviving it.
 *
 * The portrait column is sticky on desktop so the face holds while the
 * biography scrolls past it. On mobile everything stacks in reading order.
 */
export function Owner() {
  return (
    <section id="team" className="border-t border-line py-24 md:py-36">
      <div className="shell grid gap-x-10 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <div className="overflow-hidden rounded-[2px] bg-surface md:sticky md:top-32">
              <img
                src={owner.portrait}
                alt={owner.portraitAlt}
                width={900}
                height={1205}
                loading="lazy"
                decoding="async"
                className="aspect-3/4 w-full object-cover object-top"
              />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="md:sticky md:top-32">
            <Reveal>
              <RollingHeading className="font-display text-[clamp(2.25rem,5vw,4rem)]">Who cuts your hair</RollingHeading>

              <p className="mt-8 font-display text-[1.75rem] leading-tight">{owner.name}</p>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase">
                {owner.role}
              </p>

              <div className="mt-7 space-y-5">
                {owner.bio.map((paragraph) => (
                  <p key={paragraph} className="measure text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-7 border-t border-line pt-5 text-sm text-faint">{owner.since}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
