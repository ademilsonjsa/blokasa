import { asset } from '../../../components/ui/asset'
import { ButtonLink } from '../../../components/ui/Button'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { projects } from '../../../data/home'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projetos" className={styles.section} aria-labelledby="projetos-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <SectionHeader
            id="projetos-title"
            eyebrow="Portfólio aplicado"
            title="Resultados reais em obras concluídas"
            subtitle="Casas contemporâneas, condomínios fechados, eixos comerciais e empreendimentos logísticos com os pisos Blokasa."
          />
          <p className={styles.stat}>+350.000 m² pavimentados</p>
        </div>

        <ul className={styles.bento}>
          {projects.map((p, i) => (
            <li key={p.title} className={`${styles.card} ${styles[`c${i + 1}`]}`}>
              <img src={asset(p.image)} alt={p.title} loading="lazy" />
              <span className={styles.tag}>{p.tag}</span>
              <div className={styles.caption}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.text}>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <ButtonLink href="#orcamento" icon={asset('home/proj-arrow-down.svg')} className={styles.cta}>
          Quero um resultado assim na minha obra
        </ButtonLink>
      </div>
    </section>
  )
}
