import { ArrowRight } from '@phosphor-icons/react'
import { menu } from '../data/content'
import { Reveal } from './Reveal'
import { RollingHeading } from './RollingHeading'

/**
 * Prices grouped into clusters instead of one long table with a hairline under
 * every line. Each cluster gets a single rule at its head; the rows themselves
 * are separated by space. Tabular figures keep the column aligned.
 *
 * Prices are stored as plain strings so a line can read "from 150" or
 * "210 to 235" rather than being forced into a single number. The dollar sign
 * is placed against each figure here instead of being prefixed blindly.
 *
 * This is the summary. /prices/ carries the same list set larger, plus the
 * hours and the map, which are the things somebody looks up deliberately
 * rather than meets while scrolling.
 */
function formatPrice(price: string) {
  return price.replace(/\d[\d,]*/g, (n) => `$${n}`)
}

export function Menu() {
  return (
    <section id="prices" className="border-t border-line py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <RollingHeading className="font-display text-[clamp(2.25rem,5vw,4rem)]">Prices</RollingHeading>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-3 lg:gap-x-16">
          {menu.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.08}>
              <h3 className="border-t border-line-strong pt-5 font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                {group.group}
              </h3>

              <dl className="mt-7 space-y-6">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between gap-6">
                    <dt className="text-[0.9375rem] text-ink">{item.name}</dt>
                    <dd className="font-mono text-[0.9375rem] tabular-nums text-muted">
                      {formatPrice(item.price)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <a
            href="/prices/"
            className="group mt-14 inline-flex items-center gap-3 border-t border-line-strong pt-5 text-[0.9375rem] text-ink md:mt-20"
          >
            Full price list, hours and directions
            <ArrowRight
              size={16}
              weight="light"
              aria-hidden="true"
              className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
