import { ArrowUpRight } from '@phosphor-icons/react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Shape rule: rectangles are sharp at 2px across the whole page. The only
 * round thing here is the icon well, where a circle is the actual form.
 *
 * Press feedback is 140ms, inside the 100-160ms band where a button still
 * feels like it is responding to the finger rather than playing an animation.
 */

const base =
  'group relative inline-flex items-center justify-center gap-3 rounded-[2px] ' +
  'font-sans text-[0.9375rem] leading-none tracking-[-0.005em] ' +
  'transition-[transform,background-color,border-color,color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] ' +
  'active:scale-[0.98] cursor-pointer select-none ' +
  'motion-reduce:transition-none motion-reduce:active:scale-100'

const sizes = {
  md: 'h-11 pl-6 pr-2',
  sm: 'h-9 px-4',
}

type Variant = 'primary' | 'ghost'

const variants: Record<Variant, string> = {
  // Inverted against the page in both themes, so contrast is 15:1 either way.
  primary: 'bg-invert text-on-invert hover:bg-invert-hover',
  ghost: 'border border-control text-ink hover:border-ink',
}

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  size?: keyof typeof sizes
  /** Renders the nested arrow well. Off for text-only or submit buttons. */
  withArrow?: boolean
} & ComponentPropsWithoutRef<'button'>

type LinkProps = {
  children: ReactNode
  variant?: Variant
  size?: keyof typeof sizes
  withArrow?: boolean
} & ComponentPropsWithoutRef<'a'>

function ArrowWell() {
  return (
    <span
      aria-hidden="true"
      className={
        'flex size-8 shrink-0 items-center justify-center rounded-full ' +
        // Tints itself from the button's own text colour, so one well serves
        // both variants without a second hardcoded value.
        'bg-[color-mix(in_srgb,currentColor_14%,transparent)] ' +
        'transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] ' +
        'group-hover:translate-x-[2px] group-hover:-translate-y-[2px] ' +
        'motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0'
      }
    >
      <ArrowUpRight size={15} weight="regular" />
    </span>
  )
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {withArrow && <ArrowWell />}
    </button>
  )
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  ...rest
}: LinkProps) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowWell />}
    </a>
  )
}
