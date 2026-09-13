import { ArrowLeft } from '@phosphor-icons/react'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { legalNav, salon } from '../data/content'
import type { LegalDoc } from '../data/legal'

/**
 * Shared layout for /terms/ and /privacy/.
 *
 * Reading mode, not marketing: one narrow column at a comfortable measure, a
 * plain contents list at the top since these are scanned rather than read, and
 * no scroll animation on the body copy beyond the initial arrival.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = legalNav.find((item) => !item.href.includes(doc.slug))

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

            <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.96] tracking-[-0.03em]">
              {doc.title}
            </h1>
            <p className="mt-5 font-mono text-[0.6875rem] tracking-[0.16em] text-faint uppercase">
              Last updated: {doc.updated}
            </p>

            <div className="measure mt-8 space-y-4">
              {doc.intro.map((paragraph) => (
                <p key={paragraph} className="text-[1.0625rem] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-14 md:mt-20">
            <nav aria-label="On this page" className="measure border-t border-line-strong pt-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
                On this page
              </p>
              <ol className="mt-5 space-y-2.5">
                {doc.sections.map((section, i) => (
                  <li key={section.heading} className="flex gap-4 text-[0.9375rem]">
                    <span className="font-mono text-sm tabular-nums text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <a
                      href={`#${slug(section.heading)}`}
                      className="text-muted underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <div className="mt-16 md:mt-24">
            {doc.sections.map((section) => (
              <section
                key={section.heading}
                id={slug(section.heading)}
                className="border-t border-line py-10 md:py-12"
              >
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.125rem)]">
                  {section.heading}
                </h2>
                <div className="measure mt-5 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="measure mt-4 border-t border-line-strong pt-10 pb-24 md:pb-36">
            <h2 className="font-display text-[1.5rem]">Contact</h2>
            <p className="mt-4 text-muted">
              Questions about this page, or a request about your information, can go to{' '}
              <a
                href={salon.emailHref}
                className="text-ink underline underline-offset-4 transition-colors hover:text-muted"
              >
                {salon.email}
              </a>{' '}
              or{' '}
              <a
                href={salon.phoneHref}
                className="text-ink underline underline-offset-4 transition-colors hover:text-muted"
              >
                {salon.phone}
              </a>
              . You can also write to us at {salon.street}, {salon.city}.
            </p>

            {other && (
              <p className="mt-8 text-[0.9375rem]">
                <a
                  href={other.href}
                  className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Read the {other.label.toLowerCase()} page
                </a>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

function slug(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
