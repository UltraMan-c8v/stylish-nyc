import type { ComponentProps } from 'react'
import { CTA_LABEL, salon } from '../data/content'
import { useCall } from '../lib/call-context'
import { ButtonLink } from './Button'

type Props = Omit<ComponentProps<typeof ButtonLink>, 'href' | 'children'> & {
  children?: React.ReactNode
  /** Runs before the dialog opens. Used to close the mobile menu. */
  onOpen?: () => void
}

/**
 * The booking call to action.
 *
 * Stays a real tel: link in the markup, so it still works with JavaScript off,
 * still offers the browser's own long-press and right-click actions, and still
 * reads as a phone number to assistive tech. The click handler intercepts it to
 * show the number on screen first, which is what a desktop visitor needs: they
 * cannot dial from the machine they are reading on.
 */
export function CallLink({ children, onOpen, ...rest }: Props) {
  const { open } = useCall()

  return (
    <ButtonLink
      href={salon.phoneHref}
      onClick={(event) => {
        // Let modified clicks through so "copy link address" still behaves.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        onOpen?.()
        open()
      }}
      {...rest}
    >
      {children ?? CTA_LABEL}
    </ButtonLink>
  )
}
