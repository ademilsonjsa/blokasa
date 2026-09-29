import { asset } from '../../../components/ui/asset'
import { ButtonLink } from '../../../components/ui/Button'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import styles from './Process.module.css'

const steps = [
  {
    n: '01', tone: 'primary', icon: 'home/step-1.svg', w: 22.17, h: 23.33,
    title: 'Conte sobre sua obra',
    text: 'Informe o tipo de área (garagem, calçada, condomínio), a cidade de entrega e a metragem quadrada estimada do piso.',
    foot: 'Leva menos de 2 minutos',
  },
  {
    n: '02', tone: 'forest', icon: 'home/step-2.svg', w: 25.55, h: 21,
    title: 'Orientação técnica',
    text: 'Nossa equipe confere o projeto, sugere a espessura ideal (6, 8 ou 10cm) e calcula perdas técnicas e paginação recomendada.',
    foot: 'Segurança normativa ABNT',
  },
  {
    n: '03', tone: 'gold', icon: 'home/step-3.svg', w: 18.67, h: 23.33,
    title: 'Proposta personalizada',
    text: 'Você recebe a cotação formalizada com valor do produto, cálculo de paletes, frete dedicado e opções de cronograma de entrega.',
    foot: 'Sem compromisso de compra',
  },
] as const

export function Process() {
  return (
    <section className={styles.section} aria-labelledby="processo-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          id="processo-title"
          align="center"
          eyebrow="Processo consultivo"
          eyebrowTone="forest"
          title="Como solicitar e receber sua proposta"
          subtitle="Atendimento técnico e comercial focado na correta quantificação do seu projeto."
        />

        <ol className={styles.grid}>
          {steps.map((s) => (
            <li key={s.n} className={styles.card}>
              <div className={styles.top}>
                <div className={styles.row}>
                  <span className={`${styles.number} ${styles[s.tone]}`}>{s.n}</span>
                  <img src={asset(s.icon)} alt="" width={s.w} height={s.h} />
                </div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
              </div>
              <p className={styles.foot}>{s.foot}</p>
            </li>
          ))}
        </ol>

        <ButtonLink href="#orcamento" variant="forest" className={styles.cta}>
          Solicitar meu orçamento agora
        </ButtonLink>
      </div>
    </section>
  )
}
