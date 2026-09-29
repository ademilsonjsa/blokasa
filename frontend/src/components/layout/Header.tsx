import { useEffect, useState } from 'react'
import { asset } from '../ui/asset'
import { ButtonLink } from '../ui/Button'
import styles from './Header.module.css'

const links = [
  { href: '/#produtos', label: 'Produtos' },
  { href: '/#aplicacoes', label: 'Aplicações' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#duvidas', label: 'Dúvidas' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.brand} aria-label="Blokasa, página inicial">
          <img src={asset('home/logo.png')} alt="" width={32} height={32} className={styles.logo} />
          <span className={styles.brandName}>Blokasa</span>
        </a>

        <nav className={styles.nav} aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ButtonLink href="/#orcamento" className={styles.cta}>
            Solicitar orçamento
          </ButtonLink>
          {/* A área do cliente (login e meus orçamentos) entra numa próxima etapa */}
          <a href="/entrar" className={styles.account} aria-label="Área do cliente">
            <img src={asset('home/icon-user.svg')} alt="" width={12} height={12} />
          </a>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden />
          </button>
        </div>
      </div>

      <div id="menu-mobile" className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} hidden={!open}>
        <nav aria-label="Menu mobile" className={styles.drawerNav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <ButtonLink href="/#orcamento" block onClick={() => setOpen(false)}>
          Solicitar orçamento
        </ButtonLink>
      </div>
    </header>
  )
}
