import { asset } from '../../../components/ui/asset'
import { SectionHeader } from '../../../components/ui/SectionHeader'
import { formatThicknesses, getProduct } from '../../../data/catalog'
import { featuredProducts } from '../../../data/home'
import { useQuoteSelection } from '../useQuoteSelection'
import styles from './Catalog.module.css'

export function Catalog() {
  const { setModel } = useQuoteSelection()

  return (
    <section id="produtos" className={styles.section} aria-labelledby="produtos-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeader
          id="produtos-title"
          eyebrow="Linha de produtos"
          title="Pisos intertravados de alta durabilidade"
          subtitle="Produção industrial calibrada em prensas hidráulicas com agregados minerais selecionados e rigoroso controle tecnológico."
        />

        <ul className={styles.grid}>
          {featuredProducts.map((item) => {
            const product = getProduct(item.slug)
            return (
              <li key={item.slug} className={styles.card}>
                <div className={styles.media}>
                  <img src={asset(item.image)} alt={item.title} loading="lazy" />
                  {product && <span className={styles.badge}>Espessuras: {formatThicknesses(product)}</span>}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.text}>{item.description}</p>
                  <ul className={styles.tags}>
                    {item.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.footer}>
                  {item.slug === 'piso-intertravado-retangular' ? (
                    <a href="/produtos/piso-intertravado-retangular" className={styles.specify}>
                      Ver ficha técnica completa
                      <img src={asset('home/icon-arrow-right.svg')} alt="" width={12} height={12} />
                    </a>
                  ) : (
                  <a href="#orcamento" className={styles.specify} onClick={() => setModel(item.slug)}>
                    Especificar no orçamento
                    <img src={asset('home/icon-arrow-right.svg')} alt="" width={12} height={12} />
                  </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
