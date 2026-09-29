import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'forest' | 'light' | 'glass' | 'soft' | 'outline'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: string
  block?: boolean
  children: ReactNode
}

const cx = (variant: Variant, size: Size, block?: boolean, extra?: string) =>
  [styles.button, styles[variant], styles[size], block && styles.block, extra].filter(Boolean).join(' ')

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  block,
  children,
  className,
  ...rest
}: BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cx(variant, size, block, className)} {...rest}>
      <span>{children}</span>
      {icon && <img src={icon} alt="" aria-hidden className={styles.icon} />}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  block,
  children,
  className,
  type = 'button',
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cx(variant, size, block, className)} {...rest}>
      <span>{children}</span>
      {icon && <img src={icon} alt="" aria-hidden className={styles.icon} />}
    </button>
  )
}
