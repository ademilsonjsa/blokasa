import { useId, useState } from 'react'
import { asset } from '../../../components/ui/asset'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { faqs } from '../../../data/home'
import styles from './Faq.module.css'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section id="duvidas" className={styles.section} aria-labelledby="duvidas-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          id="duvidas-title"
          align="center"
          eyebrow="Tira-dúvidas técnico"
          title="Perguntas Frequentes"
          subtitle="Respostas objetivas para dúvidas comuns na fase de especificação e compra."
        />

        <div className={styles.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-p${i}`
            const buttonId = `${baseId}-b${i}`
            return (
              <div key={f.q} className={styles.item}>
                <h3 className={styles.heading}>
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <img
                      src={asset('home/faq-chevron.svg')}
                      alt=""
                      width={12}
                      height={7.4}
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
