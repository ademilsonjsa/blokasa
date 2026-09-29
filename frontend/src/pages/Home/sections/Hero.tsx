import { asset } from '../../../components/ui/asset'
import { ButtonLink } from '../../../components/ui/Button'
import styles from './Hero.module.css'

const highlights = [
  { icon: 'home/hero-check.svg', w: 16.5, h: 15.75, text: 'Alta resistência mecânica' },
  { icon: 'home/hero-clock.svg', w: 15, h: 15, text: 'Instalação rápida e eficiente' },
  { icon: 'home/hero-palette.svg', w: 15, h: 15, text: 'Variedade de modelos e cores' },
]

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img className={styles.bg} src={asset('home/hero-bg.png')} alt="" fetchPriority="high" />
      <div className={styles.overlay} aria-hidden />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.badge}>
            <span className={styles.dot} aria-hidden />
            Pisos intertravados para sua obra
          </p>
          <h1 id="hero-title" className={styles.title}>
            Resistência, drenagem e acabamento para áreas externas.
          </h1>
          <p className={styles.subtitle}>
            Fornecimento direto de fábrica, variedade de modelos normalizados e atendimento técnico consultivo para
            projetos residenciais, comerciais e urbanos.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="#orcamento" variant="light" className={styles.primary}>
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink href="#produtos" variant="glass" icon={asset('home/icon-arrow-down.svg')} className={styles.secondary}>
              Ver modelos
            </ButtonLink>
          </div>
        </div>

        <ul className={styles.highlights}>
          {highlights.map((h) => (
            <li key={h.text}>
              <img src={asset(h.icon)} alt="" width={h.w} height={h.h} />
              {h.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
