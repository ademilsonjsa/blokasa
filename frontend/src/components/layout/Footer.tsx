import { company, fullAddress } from '../../data/company'
import { asset } from '../ui/asset'
import { ButtonLink } from '../ui/Button'
import styles from './Footer.module.css'

const productLinks = [
  { href: '/#produtos', label: 'Pisos Intertravados' },
  { href: '/#produtos', label: 'Pisos e Placas Drenantes' },
  { href: '/#produtos', label: 'Série Sextavada & 16 Faces' },
  { href: '/#produtos', label: 'Guias e Mini Guias' },
  { href: '/#produtos', label: 'Blocos Estruturais e de Vedação' },
]

const institutionalLinks = [
  { href: '/#sobre', label: 'Sobre a Blokasa' },
  { href: '/#projetos', label: 'Portfólio de Obras' },
  { href: '/#aplicacoes', label: 'Aplicações por Uso' },
  { href: '/#duvidas', label: 'Perguntas Frequentes' },
  { href: '/#orcamento', label: 'Solicitar Orçamento' },
]

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.about}>
            <div className={styles.brand}>
              <img src={asset('home/logo.png')} alt="" width={32} height={32} className={styles.logo} />
              <span className={styles.brandName}>Blokasa</span>
            </div>
            <p className={styles.aboutText}>
              Artefatos de concreto prensado para obras residenciais, comerciais e públicas. Pisos intertravados,
              drenantes, guias e blocos com atendimento consultivo sob medida para o seu projeto.
            </p>
            <div>
              <p className={styles.kicker}>Indústria &amp; Distribuição</p>
              <p className={styles.small}>Normas NBR 9781 • Pisos Drenantes • Alta Durabilidade</p>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Produtos</h4>
            <ul className={styles.list}>
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Institucional</h4>
            <ul className={styles.list}>
              {institutionalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contato</h4>
            <ul className={`${styles.list} ${styles.contact}`}>
              <li>
                <img src={asset('home/foot-pin.svg')} alt="" width={12} height={15} />
                <span>{fullAddress}</span>
              </li>
              <li>
                <img src={asset('home/foot-phone.svg')} alt="" width={13.5} height={13.5} />
                <a href={company.phone.href}>{company.phone.display}</a>
              </li>
              <li>
                <img src={asset('home/whats-chat.svg')} alt="" width={15} height={15} />
                <a href={company.whatsapp.href} target="_blank" rel="noreferrer">
                  WhatsApp {company.whatsapp.display}
                </a>
              </li>
              {company.emails.map((email) => (
                <li key={email}>
                  <img src={asset('home/foot-mail.svg')} alt="" width={15} height={12} />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ))}
            </ul>
            <ButtonLink href="/#orcamento" variant="outline" icon={asset('home/foot-doc.svg')} className={styles.memorial}>
              Enviar projeto para cotação
            </ButtonLink>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.small}>
            © {year} {company.legalName}. Todos os direitos reservados.
          </p>
          <p className={styles.note}>Atendimento para obras de todos os portes, sob consulta de metragem.</p>
        </div>
      </div>
    </footer>
  )
}
