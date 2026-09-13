import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { CallLink } from '../components/CallLink'
import { StudioInfo } from '../components/StudioInfo'
import { maps, menu, salon } from '../data/content'

/**
 * /prices/ - the full price list.
 *
 * The landing page keeps its own three-column summary; this is the version you
 * arrive at from the nav, with room for the things that do not belong on a
 * landing page: the hours and the map.
 *
 * Each group is a 12-column row with the group name held in the left margin
 * and the lines set against it, which is how a printed menu is set. A leader
 * rule runs between name and price so the eye can cross the gap on the wide
 * rows without the list turning into a ruled table.
 */

function formatPrice(price: string) {
  return price.replace(/\d[\d,]*/g, (n) => `$${n}`)
}

export function PricesPage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main id="main" className="pt-28 md:pt-36">
        <div className="shell">
          <Reveal>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
            >
              <ArrowLeft size={14} weight="light" aria-hidden="true" />
              Back to the studio
            </a>

            <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.94] tracking-[-0.03em]">
              Prices
            </h1>
            <p className="measure mt-6 text-[1.0625rem] text-muted">
              Starting prices in US dollars. Colour is quoted at consultation, because the number
              depends on your hair rather than on the name of the service.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <CallLink withArrow />
              <p className="text-sm text-faint">Booking is by phone. Online booking coming soon.</p>
            </div>
          </Reveal>
        </div>

        <div className="shell mt-16 md:mt-24">
          {menu.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <section className="grid gap-x-10 gap-y-7 border-t border-line-strong py-10 md:grid-cols-12 md:py-14">
                <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase md:col-span-3">
                  {group.group}
                </h2>

                <dl className="space-y-7 md:col-span-8 md:col-start-5">
                  {group.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-4">
                      <dt className="font-display text-[1.375rem] leading-none tracking-[-0.01em] text-ink md:text-[1.75rem]">
                        {item.name}
                      </dt>

                      {/* Leader. A single hairline that eats whatever space is
                          left, so short and long names both resolve to the same
                          right-hand column. */}
                      <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.25em] bg-line" />

                      <dd className="font-mono text-[0.9375rem] tabular-nums text-muted md:text-[1.0625rem]">
                        {formatPrice(item.price)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Where it is. The map is a full-width band rather than a card: it is
            the last thing on the page and it should feel like arriving. */}
        <section className="mt-16 border-t border-line pt-16 md:mt-24 md:pt-24">
          <div className="shell grid gap-x-10 gap-y-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <StudioInfo />

                <a
                  href={maps.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-[0.9375rem] text-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} weight="light" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={0.08}>
                <div className="map-frame overflow-hidden rounded-[2px] border border-line bg-surface">
                  <iframe
                    src={maps.embedSrc}
                    title={maps.title}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="block h-[22rem] w-full border-0 md:h-[30rem]"
                  />
                </div>
                <p className="mt-4 text-sm text-faint">
                  {salon.name} operates out of {salon.venue}.
                  <span className="hidden md:inline"> Hover the map to bring the colour back.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
