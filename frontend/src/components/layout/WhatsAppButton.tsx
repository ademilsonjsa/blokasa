import { company } from '../../data/company'
import { asset } from '../ui/asset'
import styles from './WhatsAppButton.module.css'

export function WhatsAppButton() {
  return (
    <a
      href={company.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      className={styles.fab}
      aria-label="Falar com um consultor pelo WhatsApp"
    >
      <span className={styles.icon}>
        <img src={asset('home/whats-chat.svg')} alt="" width={15} height={15} />
      </span>
      <span className={styles.text}>
        <span className={styles.kicker}>WhatsApp técnico</span>
        <span className={styles.label}>Falar com Consultor</span>
      </span>
    </a>
  )
}
