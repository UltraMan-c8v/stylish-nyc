import { services } from '../data/content'
import { Reveal } from './Reveal'
import { RollingHeading } from './RollingHeading'
import { ScrollWords } from './ScrollWords'

/**
 * Asymmetric bento. Exactly five cells for five services, so no tile is
 * padding. Cell one is a full-bleed feature, three carry images above their
 * copy, and the last is type only, which keeps the grid from reading as four
 * matching cards plus a straggler.
 */

const CELL =
  'group relative flex flex-col rounded-[2px] border border-line bg-surface overflow-hidden'

const layout = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
]

export function Services() {
  const [feature, ...rest] = services

  return (
    <section id="services" data-surface className="border-t border-line bg-canvas py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <RollingHeading className="font-display text-[clamp(2.25rem,5vw,4rem)]">What we do</RollingHeading>
          <ScrollWords
            as="p"
            className="measure mt-5 text-muted"
            lines={[
              'Five things, done properly, rather than a list',
              'that covers everything and commits to nothing.',
            ]}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:grid-rows-[repeat(3,minmax(0,1fr))] md:gap-5">
          {/* Feature cell: image fills, copy sits over a scrim at the base. */}
          <Reveal className={`${CELL} ${layout[0]} min-h-[26rem]`} y={24}>
            <img
              src={feature.image ?? ''}
              alt={feature.alt ?? ''}
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {/* Weighted hard to the base. The photograph behind it can be light
                or dark, so the scrim has to guarantee the copy's contrast on
                its own rather than relying on the image being dark. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#08080a] from-0% via-[#08080a]/80 via-42% to-transparent to-88%"
            />
            <div className="relative mt-auto p-7 md:p-9">
              {/* Fixed light values, not theme tokens: this copy always sits on
                  a dark photograph, in either theme. */}
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-[#f4f4f1]">
                {feature.title}
              </h3>
              <p className="measure mt-3 text-[0.9375rem] text-[#c9c9c4]">{feature.body}</p>
            </div>
          </Reveal>

          {rest.map((service, i) => {
            const hasImage = Boolean(service.image)

            return (
              <Reveal
                key={service.id}
                className={`${CELL} ${layout[i + 1]}`}
                delay={0.06 * (i + 1)}
                y={24}
              >
                {hasImage && (
                  <div className="overflow-hidden">
                    <img
                      src={service.image ?? ''}
                      alt={service.alt ?? ''}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-16/10 w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                )}

                <div
                  className={
                    'flex flex-1 flex-col justify-center p-7 md:p-9 ' +
                    (hasImage ? '' : 'md:py-14')
                  }
                >
                  <h3
                    className={
                      'font-display ' +
                      (hasImage
                        ? 'text-[1.5rem] md:text-[1.75rem]'
                        : 'text-[clamp(1.75rem,3vw,2.5rem)]')
                    }
                  >
                    {service.title}
                  </h3>
                  <p className="measure mt-3 text-[0.9375rem] text-muted">{service.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
