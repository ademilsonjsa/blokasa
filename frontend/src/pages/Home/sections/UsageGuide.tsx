import { asset } from '../../../components/ui/asset'
import { ButtonLink } from '../../../components/ui/Button'
import { company } from '../../../data/company'
import styles from './UsageGuide.module.css'

const uses = [
  { icon: 'home/uso-car.svg', w: 15, h: 13.33, title: 'Garagens & Acessos', text: 'Residências, rampas e circulação de utilitários leves (6cm ou 8cm).' },
  { icon: 'home/uso-walk.svg', w: 12.5, h: 17.92, title: 'Calçadas & Praças', text: 'Áreas de pedestres com total acessibilidade e piso tátil integrado (6cm).' },
  { icon: 'home/uso-building.svg', w: 15, h: 15, title: 'Vias Condominiais', text: 'Ruas internas com velocidade reduzida e estética unificada (8cm).' },
  { icon: 'home/uso-truck.svg', w: 18.33, h: 13.33, title: 'Pátios e Logística', text: 'Galpões industriais, docas e estacionamentos com tráfego intenso (8cm a 10cm).' },
]

export function UsageGuide() {
  return (
    <section id="aplicacoes" className={styles.section} aria-labelledby="aplicacoes-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.panel}>
          <div className={styles.panelTop}>
            <p className={styles.badge}>Guia prático de dimensionamento</p>
            <h2 id="aplicacoes-title" className={styles.title}>
              O piso certo para cada área da sua obra.
            </h2>
            <p className={styles.lead}>
              A espessura e a geometria do piso definem a capacidade de suporte e a longevidade da via. Peças de{' '}
              <strong>6cm</strong> atendem passeios e garagens leves; <strong>8cm</strong> é a especificação para
              tráfego comercial e veículos médios; e <strong>10cm</strong> para carga pesada contínua.
            </p>
            <ul className={styles.uses}>
              {uses.map((u) => (
                <li key={u.title} className={styles.use}>
                  <span className={styles.useHead}>
                    <img src={asset(u.icon)} alt="" width={u.w} height={u.h} />
                    {u.title}
                  </span>
                  <span className={styles.useText}>{u.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink
            href={company.whatsapp.href}
            target="_blank"
            rel="noreferrer"
            icon={asset('home/uso-headset.svg')}
            className={styles.cta}
          >
            Falar com um especialista técnico
          </ButtonLink>
        </div>

        <figure className={styles.photo}>
          <img src={asset('home/uso-foto.png')} alt="Área comercial pavimentada com piso intertravado" loading="lazy" />
          <figcaption className={styles.caption}>
            <span>
              <span className={styles.captionKicker}>Projeto em destaque</span>
              <strong className={styles.captionTitle}>Boulevard Urbano e Centro Empresarial</strong>
              <span className={styles.captionText}>
                Mais de 4.800 m² de piso retangular 8cm com pigmentação natural.
              </span>
            </span>
            <span className={styles.captionIcon}>
              <img src={asset('home/uso-check.svg')} alt="" width={15} height={15} />
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
