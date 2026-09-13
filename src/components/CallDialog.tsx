import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, Copy, Phone, X } from '@phosphor-icons/react'
import { hours, salon } from '../data/content'
import { CallContext } from '../lib/call-context'
import { Button, ButtonLink } from './Button'

/**
 * Booking is by phone, and on desktop a bare tel: link is a dead end: it either
 * does nothing or throws up an unexplained "open an application" prompt. This
 * puts the number on screen first, so a desktop visitor can read it and dial
 * from their handset, and only hands off to the OS dialer if they ask for it.
 *
 * Built on the native <dialog> element rather than a div. That gives the focus
 * trap, the inert background, Escape to close and focus restoration for free,
 * all of which are easy to get subtly wrong by hand.
 */
export function CallProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [copied, setCopied] = useState(false)

  const open = useCallback(() => {
    setCopied(false)
    ref.current?.showModal()
  }, [])

  const value = useMemo(() => ({ open }), [open])

  // Clicking the backdrop closes. The dialog element itself covers only the
  // card, so a click landing on <dialog> is a click outside the card.
  const onClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) ref.current?.close()
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(salon.phone)
      setCopied(true)
    } catch {
      // Clipboard blocked. The number is on screen to read either way.
    }
  }

  return (
    <CallContext.Provider value={value}>
      {children}

      <dialog
        ref={ref}
        onClick={onClick}
        aria-labelledby="call-heading"
        className="call-dialog max-w-[min(28rem,calc(100vw-2rem))] rounded-[2px] border border-line-strong bg-surface p-0 text-ink"
      >
        <div className="relative p-8 md:p-10">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-[2px] text-muted transition-colors duration-200 hover:text-ink"
          >
            <X size={17} weight="light" aria-hidden="true" />
          </button>

          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
            Stylish NYC
          </p>
          <h2 id="call-heading" className="mt-4 font-display text-[1.75rem] leading-tight">
            Call the studio
          </h2>

          <a
            href={salon.phoneHref}
            className="mt-6 block font-display text-[clamp(2.25rem,8vw,3rem)] leading-none tracking-[-0.03em] transition-opacity duration-200 hover:opacity-70"
          >
            {salon.phone}
          </a>

          <dl className="mt-8 space-y-2 border-t border-line pt-5 text-sm">
            {hours.map((slot) => (
              <div key={slot.days} className="flex items-baseline justify-between gap-5">
                <dt className="text-muted">{slot.days}</dt>
                <dd className="font-mono tabular-nums text-faint">{slot.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={salon.phoneHref}>
              <span className="flex items-center gap-2">
                <Phone size={15} weight="light" aria-hidden="true" />
                Call now
              </span>
            </ButtonLink>

            <Button variant="ghost" onClick={copy}>
              <span className="flex items-center gap-2">
                {copied ? (
                  <Check size={15} weight="light" aria-hidden="true" />
                ) : (
                  <Copy size={15} weight="light" aria-hidden="true" />
                )}
                {copied ? 'Copied' : 'Copy number'}
              </span>
            </Button>
          </div>

          {/* Announced politely so a screen reader hears the copy succeeded. */}
          <p aria-live="polite" className="sr-only">
            {copied ? 'Phone number copied to clipboard' : ''}
          </p>
        </div>
      </dialog>
    </CallContext.Provider>
  )
}
