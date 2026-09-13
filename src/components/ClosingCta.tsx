import { CTA_NOTE, salon } from '../data/content'
import { CallLink } from './CallLink'
import { Reveal } from './Reveal'
import { RollingHeading } from './RollingHeading'
import { StudioInfo } from './StudioInfo'

/**
 * Closing section of the landing page.
 *
 * Booking is by phone only, so this section's whole job is to get the number
 * dialled. The number is shown as display type as well as wired to the button,
 * because on desktop nobody taps a tel: link, they read it and pick up a phone.
 *
 * The note underneath is deliberate: it tells a visitor that online booking is
 * a planned thing rather than an oversight, which is also the opening for
 * building it later.
 */
export function ClosingCta() {
  return (
    <>
      {/* Full-bleed band. A different layout family from every section above,
          and it re-establishes the room before the page asks for a booking. */}
      <Reveal className="relative">
        <img
          src="/img/salon-interior.webp"
          alt="A salon interior: backlit horizontal light bars along a dark wall, facing a row of illuminated mirrors."
          width={2000}
          height={1802}
          loading="lazy"
          decoding="async"
          className="h-[42vh] w-full object-cover md:h-[62vh]"
        />
      </Reveal>

      <section id="book" data-surface className="bg-surface py-24 md:py-36">
        <div className="shell grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <RollingHeading className="font-display text-[clamp(2.25rem,5vw,4rem)]">Book by phone</RollingHeading>
              <p className="measure mt-5 text-muted">
                One chair means the book is kept by hand. Call and Roman will find you a time,
                usually within the same week.
              </p>

              <a
                href={salon.phoneHref}
                className="mt-10 inline-block font-display text-[clamp(2rem,5.5vw,3.5rem)] leading-none tracking-[-0.03em] text-ink transition-opacity duration-200 hover:opacity-70"
              >
                {salon.phone}
              </a>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CallLink withArrow />
              </div>

              <p className="mt-6 text-sm text-faint">{CTA_NOTE}</p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.08}>
              <StudioInfo />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
