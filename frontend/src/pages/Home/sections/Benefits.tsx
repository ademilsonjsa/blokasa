import { asset } from '../../../components/ui/asset'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import styles from './Benefits.module.css'

const items = [
  {
    icon: 'home/ben-resist.svg', w: 19.8, h: 19.8,
    title: 'Resistência e Carga',
    text: 'Alta compactação que garante resistência característica à compressão de 35 a 50 MPa, prevenindo fissuras por dilatação e afundamento.',
    seal: 'Norma NBR 9781', sealIcon: 'home/ben-shield.svg', sw: 9.33, sh: 11.67,
  },
  {
    icon: 'home/ben-drop.svg', w: 16, h: 20,
    title: 'Drenagem Sustentável',
    text: 'Juntas preenchidas com areia ou pedrisco calibrado que facilitam o escoamento de água pluvial, reduzindo poças e alimentando o lençol freático.',
    seal: 'Coeficiente Permeável', sealIcon: 'home/ben-leaf.svg', sw: 9.91, sh: 9.91,
  },
  {
    icon: 'home/ben-tool.svg', w: 20, h: 20,
    title: 'Manutenção Ágil',
    text: 'Peças assentadas a seco que podem ser retiradas individualmente para manutenções de rede elétrica ou hidráulica e recolocadas sem quebras.',
    seal: 'Zero Quebra-Quebra', sealIcon: 'home/ben-cycle.svg', sw: 9.33, sh: 12.83,
  },
  {
    icon: 'home/ben-layout.svg', w: 18, h: 14,
    title: 'Composição Estética',
    text: 'Cores minerais sólidas (natural, vermelho, grafite, amarelo e terracota) que não desbotam com intempéries e permitem diagramações arquitetônicas ricas.',
    seal: 'Paginações Diversas', sealIcon: 'home/ben-pen.svg', sw: 11.08, sh: 10.5,
  },
]

export function Benefits() {
  return (
    <section className={styles.section} aria-labelledby="beneficios-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          id="beneficios-title"
          align="center"
          eyebrow="Vantagens construtivas"
          title="Engenharia que valoriza sua área externa"
          subtitle="O pavimento intertravado de concreto oferece longevidade superior a pavimentos asfálticos ou placas cimentícias moldadas in loco."
        />

        <ul className={styles.grid}>
          {items.map((it) => (
            <li key={it.title} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.icon}>
                  <img src={asset(it.icon)} alt="" width={it.w} height={it.h} />
                </span>
                <h3 className={styles.title}>{it.title}</h3>
                <p className={styles.text}>{it.text}</p>
              </div>
              <p className={styles.seal}>
                <img src={asset(it.sealIcon)} alt="" width={it.sw} height={it.sh} />
                {it.seal}
              </p>
            </li>
          ))}
        </ul>

        <a href="#duvidas" className={styles.more}>
          Consultar memorial descritivo e ensaios tecnológicos
          <img src={asset('home/ben-arrow.svg')} alt="" width={15} height={10.5} />
        </a>
      </div>
    </section>
  )
}
