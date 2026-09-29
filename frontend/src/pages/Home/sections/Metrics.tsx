import { asset } from '../../../components/ui/asset'
import { metrics, testimonial } from '../../../data/home'
import styles from './Metrics.module.css'

export function Metrics() {
  return (
    <section id="sobre" className={styles.section} aria-label="Sobre a Blokasa">
      <div className={`container ${styles.inner}`}>
        <dl className={styles.metrics}>
          {metrics.map((m) => (
            <div key={m.title} className={styles.metric}>
              <dt className={styles.srOnlyWrap}>
                <span className={`${styles.value} ${styles[m.tone]}`}>{m.value}</span>
                <span className={styles.title}>{m.title}</span>
              </dt>
              <dd className={styles.text}>{m.text}</dd>
            </div>
          ))}
        </dl>

        <figure className={styles.testimonial}>
          <span className={styles.quoteIcon} aria-hidden>
            <img src={asset('home/quote.svg')} alt="" width={25.5} height={18} />
          </span>
          <div className={styles.quoteBody}>
            <blockquote className={styles.quote}>"{testimonial.quote}"</blockquote>
            <figcaption>
              <strong className={styles.author}>{testimonial.author}</strong>
              <span className={styles.role}>{testimonial.role}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
