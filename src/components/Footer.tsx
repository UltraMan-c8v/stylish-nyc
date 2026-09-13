import { InstagramLogo } from '@phosphor-icons/react'
import { legalNav, nav, salon } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line py-14 md:py-20">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.035em]">
            Stylish<span className="text-muted"> NYC</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Icon-only, so it carries its own accessible name rather than
                relying on adjacent text. 44px tap target around a 20px glyph. */}
            <a
              href={salon.instagramHref}
              rel="noreferrer noopener"
              target="_blank"
              aria-label={`Stylish NYC on Instagram, ${salon.instagram}`}
              className="-m-3 flex size-11 items-center justify-center text-muted transition-colors duration-200 hover:text-ink"
            >
              <InstagramLogo size={20} weight="light" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            {salon.venue}, {salon.street}, {salon.city}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <p>&copy; {new Date().getFullYear()} {salon.trademark}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
