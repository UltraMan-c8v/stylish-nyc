import { HOURS_NOTE, hours, salon } from '../data/content'

const heading =
  'border-t border-line-strong pt-5 font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase'

/** Address, contact and opening hours. */
export function StudioInfo() {
  return (
    <>
      <h3 className={heading}>Studio</h3>
      <address className="mt-6 space-y-1 text-[0.9375rem] text-ink not-italic">
        <p>{salon.name} at {salon.venue}</p>
        <p>{salon.street}</p>
        <p>{salon.city}</p>
      </address>
      <div className="mt-5 space-y-1 text-[0.9375rem]">
        <p>
          <a
            href={salon.phoneHref}
            className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {salon.phone}
          </a>
        </p>
        <p>
          <a
            href={salon.emailHref}
            className="text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {salon.email}
          </a>
        </p>
      </div>

      <h3 className={`${heading} mt-12`}>Hours</h3>
      <p className="mt-6 text-[0.9375rem] text-accent">{HOURS_NOTE}</p>
      <dl className="mt-5 space-y-3 text-[0.9375rem]">
        {hours.map((slot) => (
          <div key={slot.days} className="flex items-baseline justify-between gap-5">
            <dt className="text-ink">{slot.days}</dt>
            <dd className="font-mono text-sm tabular-nums text-muted">{slot.time}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}
