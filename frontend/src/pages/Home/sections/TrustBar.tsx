import { asset } from '../../../components/ui/asset'
import styles from './TrustBar.module.css'

const items = [
  { icon: 'home/trust-building.svg', w: 18.33, h: 16.5, title: 'Soluções sob medida', text: 'Para cada perfil e porte de obra' },
  { icon: 'home/trust-compass.svg', w: 10.08, h: 16.5, title: 'Orientação técnica', text: 'Dimensionamento e espessuras NBR' },
  { icon: 'home/trust-truck.svg', w: 20.17, h: 14.67, title: 'Entrega programada', text: 'Descarga paletizada no canteiro' },
  { icon: 'home/trust-bolt.svg', w: 14.67, h: 18.33, title: 'Atendimento ágil', text: 'Cotação formalizada em até 24 horas', accent: true },
]

export function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Diferenciais">
      <ul className={`container ${styles.list}`}>
        {items.map((it) => (
          <li key={it.title} className={styles.item}>
            <span className={`${styles.icon} ${it.accent ? styles.iconAccent : ''}`}>
              <img src={asset(it.icon)} alt="" width={it.w} height={it.h} />
            </span>
            <span>
              <strong className={styles.title}>{it.title}</strong>
              <span className={styles.text}>{it.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
