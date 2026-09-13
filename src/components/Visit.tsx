import { visit } from '../data/content'
import { Reveal } from './Reveal'

/**
 * Sticky image on the left, the three parts of an appointment scrolling past
 * it on the right. The image holds still because it is the room you are
 * reading about; the text moves because it is the sequence.
 *
 * Headings are the actual thing that happens. No "Stage 1 / Stage 2" labels:
 * the order is already the order.
 */
export function Visit() {
  return (
    <section
      id="visit"
      data-surface
      className="border-t border-line bg-surface py-24 md:py-36"
    >
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <div className="overflow-hidden rounded-[2px] bg-canvas">
                <img
                  src="/img/chair-mirror.webp"
                  alt="A single empty matte black salon chair facing a tall mirror, with afternoon light across the floor."
                  width={2000}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover md:aspect-3/4"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)]">
              What an appointment is like
            </h2>
          </Reveal>

          <div className="mt-12 md:mt-16">
            {visit.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.06}
                className="border-t border-line py-9 first:border-t-0 first:pt-0 md:py-12"
              >
                <h3 className="font-display text-[1.75rem] md:text-[2rem]">{step.title}</h3>
                <p className="measure mt-4 text-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
