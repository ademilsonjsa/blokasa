import type { ReactNode } from 'react'
import styles from './SectionHeader.module.css'

interface Props {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  eyebrowTone?: 'primary' | 'forest'
  id?: string
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'left', eyebrowTone = 'primary', id }: Props) {
  return (
    <header className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      <p className={`${styles.eyebrow} ${eyebrowTone === 'forest' ? styles.eyebrowForest : ''}`}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  )
}
