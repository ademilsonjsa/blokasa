import { useMemo, useState, type FormEvent } from 'react'
import { Button, ButtonLink } from '../../components/ui/Button'
import { company } from '../../data/company'
import { colorHex, getProduct, rectangularSpecs } from '../../data/catalog'
import { buildWhatsAppQuote, maskPhone, validateQuote, type QuoteErrors } from '../../services/quotes'
import styles from './Produto.module.css'

const patterns = [
  {
    name: 'Espinha de Peixe (45° ou 90°)',
    text: 'A disposição mais travada para tráfego de veículos: distribui a força em todas as direções e evita deslocamento das peças.',
    tag: 'Recomendado: garagens e vias',
  },
  {
    name: 'Amarração Linear (Corrida)',
    text: 'Instalação mais rápida, com fileiras contínuas no mesmo sentido. Boa opção quando o fluxo de veículos é predominante em uma direção.',
    tag: 'Recomendado: calçadas e alamedas',
  },
  {
    name: 'Dama (Parquet / Cesto)',
    text: 'Agrupamento de duas a duas peças formando um padrão xadrez, com efeito estético em pátios e áreas de descanso.',
    tag: 'Recomendado: pátios e praças',
  },
]

const product = getProduct('piso-intertravado-retangular')!

const emptyForm = { name: '', phone: '', email: '', cityState: '', area: '', message: '' }

function Simulator() {
  const [height, setHeight] = useState(6)
  const [area, setArea] = useState('')
  const areaNum = Number(area.replace(',', '.')) || 0
  const spec = product.measures.find((m) => m.height === height) ?? product.measures[0]

  const result = useMemo(() => {
    const m2PerPiece = (spec.width * spec.length) / 10000
    const lossMargin = 1.08
    const pieces = Math.ceil((areaNum / m2PerPiece) * lossMargin)
    const areaPerPallet = height <= 6 ? 13 : height <= 8 ? 11 : 9
    const pallets = areaNum ? Math.ceil(areaNum / areaPerPallet) : 0
    const weightKgPerM2 = height <= 6 ? 130 : height <= 8 ? 155 : 175
    const totalTons = (areaNum * weightKgPerM2) / 1000
    return { pieces, pallets, totalTons }
  }, [areaNum, height, spec])

  return (
    <div className={styles.simGrid}>
      <form className={styles.simForm} onSubmit={(e) => e.preventDefault()}>
        <label>
          Espessura do produto
          <select value={height} onChange={(e) => setHeight(Number(e.target.value))}>
            {product.measures.map((m) => (
              <option key={m.height} value={m.height}>
                {m.height}cm — {m.height <= 6 ? 'Tráfego Médio' : m.height <= 8 ? 'Tráfego Pesado' : 'Tráfego Extra-Pesado'}
              </option>
            ))}
          </select>
        </label>
        <label>
          Área estimada (m²)
          <input inputMode="decimal" placeholder="Ex: 350" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
      </form>

      <dl className={styles.simResults}>
        <div>
          <dt>Peças no recorte (5%)</dt>
          <dd>{result.pieces.toLocaleString('pt-BR')} un.</dd>
        </div>
        <div>
          <dt>Paletes estimados</dt>
          <dd>{result.pallets} paletes</dd>
        </div>
        <div>
          <dt>Peso total estimado</dt>
          <dd>{result.totalTons.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}t</dd>
        </div>
        <p className={styles.simNote}>
          Cálculo orientativo (considera 8% de margem técnica de recorte). O quantitativo final da obra é confirmado
          pela nossa engenharia.
        </p>
      </dl>
    </div>
  )
}

function QuoteSection() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateQuote({ ...form, projectType: 'Especificação técnica', model: product.slug })
    setErrors(found)
    if (Object.keys(found).length) return
    const url = buildWhatsAppQuote({ ...form, projectType: 'Especificação técnica', model: product.slug })
    window.open(url, '_blank', 'noopener')
    setSentUrl(url)
  }

  return (
    <section className={`${styles.section} ${styles.alt}`} aria-labelledby="cotacao-title">
      <div className="container">
        <div className={styles.quoteCard}>
          <p className={styles.eyebrow} style={{ color: 'var(--color-gold)' }}>
            Cotação direta de fábrica
          </p>
          <h2 id="cotacao-title" className={styles.h2} style={{ color: 'var(--color-cream)' }}>
            Solicitar Proposta Técnica e Memorial Descritivo
          </h2>
          <p className={styles.lead} style={{ color: 'var(--color-sage)' }}>
            Atendimento consultivo para engenheiros, arquitetos, loteadoras, construtoras e proprietários. Retorno
            formal com frete para o canteiro em até 24 horas úteis.
          </p>

          {sentUrl ? (
            <p style={{ marginTop: 24 }}>
              Pedido pronto! Abrimos o WhatsApp da Blokasa com os dados da sua especificação. Se não abriu,{' '}
              <a href={sentUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
                clique aqui
              </a>
              .
            </p>
          ) : (
            <form className={styles.quoteForm} onSubmit={onSubmit} noValidate>
              <span className={`${styles.selectedTag} ${styles.full}`}>Produto selecionado: {product.name}</span>

              <label>
                Nome completo *
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                E-mail corporativo *
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
                {errors.email && <small>{errors.email}</small>}
              </label>
              <label>
                WhatsApp / Telefone *
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: maskPhone(e.target.value) }))}
                />
                {errors.phone && <small>{errors.phone}</small>}
              </label>
              <label>
                Cidade e UF da obra *
                <input
                  value={form.cityState}
                  onChange={(e) => setForm((f) => ({ ...f, cityState: e.target.value }))}
                />
                {errors.cityState && <small>{errors.cityState}</small>}
              </label>
              <label>
                Metragem prevista da área (m²) *
                <input value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} />
              </label>
              <label className={styles.full}>
                Observações técnicas, paginação pretendida ou restrições do canteiro
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              </label>

              <div className={`${styles.full} ${styles.submitRow}`}>
                <Button type="submit" size="lg">
                  Enviar Solicitação Formal de Cotação
                </Button>
                <span className={styles.submitNote}>Sem compromisso de compra • Resposta rápida da engenharia</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Produto() {
  return (
    <>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container" style={{ display: 'flex', gap: 8 }}>
          <a href="/">Início</a>
          <span>/</span>
          <a href="/#produtos">Catálogo de Modelos</a>
          <span>/</span>
          <span>{product.name} (10x20)</span>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.gallery}>
            <figure className={styles.mainImage}>
              <figcaption>Paginação Mista · Espinha de Peixe 45° + Amarração Linear</figcaption>
            </figure>
            <div className={styles.thumbs}>
              <div />
              <div />
              <div />
            </div>
          </div>

          <div className={styles.heroInfo}>
            <span className={styles.tag}>Linha Arquitetura Mineral • Alta Performance</span>
            <h1>Paver Holandês (Retangular)</h1>
            <p className={styles.heroSubtitle}>Versatilidade arquitetônica, alta resistência e travamento contínuo</p>
            <p className={styles.heroText}>
              O formato retangular é consagrado na engenharia de pavimentação intertravada. Fabricado em matriz de
              concreto com cura vapor controlada e agregados minerais selecionados, viabiliza múltiplas alternativas
              de paginação (espinha de peixe, amarração linear, dama), garantindo conforto de rolamento, atrito
              antiderrapante e perenidade estética para projetos públicos, industriais e residenciais.
            </p>

            <dl className={styles.specRow}>
              <div>
                <dt>Dimensões NBR</dt>
                <dd>10 x 20 cm</dd>
              </div>
              <div>
                <dt>Rendimento</dt>
                <dd>50 peças / m²</dd>
              </div>
              <div>
                <dt>Tolerância</dt>
                <dd>± 2,0 mm</dd>
              </div>
              <div>
                <dt>Chanfro</dt>
                <dd>5 mm x 45°</dd>
              </div>
            </dl>

            <div className={styles.heroActions}>
              <ButtonLink href="#orcamento">Incluir no Orçamento da Obra</ButtonLink>
              <ButtonLink href="#simulador" variant="soft">
                Simular m²
              </ButtonLink>
            </div>
            <p className={styles.heroFoot}>
              Dúvida técnica sobre este modelo?{' '}
              <a href={company.phone.href}>Suporte de Engenharia de Aplicação — {company.phone.display}</a>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.sectionInner}`}>
          <div>
            <p className={styles.eyebrow}>Classificação estrutural NBR 9781</p>
            <h2 className={styles.h2}>Espessuras de Fabricação &amp; Capacidade de Carga</h2>
            <p className={styles.lead}>
              A escolha da espessura do bloco determina a vida útil e a estabilidade estrutural do pavimento
              conforme o fluxo e peso dos veículos.
            </p>
          </div>

          <div className={styles.thicknessGrid}>
            {rectangularSpecs.map((s) => (
              <div key={s.height} className={`${styles.thicknessCard} ${s.featured ? styles.featured : ''}`}>
                {s.featured && <span className={styles.thicknessBadge}>Mais Especificado</span>}
                <span className={styles.thicknessValue}>{s.height} cm</span>
                <span className={styles.thicknessTraffic}>{s.traffic}</span>
                <span className={styles.thicknessRes}>Resistência: {s.resistance}</span>
                <ul className={styles.thicknessUses}>
                  {s.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
                <span className={styles.thicknessWeight}>Peso aproximado: {s.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={`container ${styles.sectionInner}`}>
          <div>
            <p className={styles.eyebrow}>Caderno de Paginação e Travamento</p>
            <h2 className={styles.h2}>Paginações Recomendadas pela Norma NBR 9781</h2>
            <p className={styles.lead}>
              A geometria 10x20 oferece alta flexibilidade de arranjo construtivo. Conheça o comportamento
              estrutural de cada padrão antes de detalhar o projeto executivo.
            </p>
          </div>

          <div className={styles.patternGrid}>
            {patterns.map((p) => (
              <div key={p.name} className={styles.patternCard}>
                <div className={styles.patternSwatch} />
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <span className={styles.patternTag}>{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.sectionInner}`}>
          <div>
            <p className={styles.eyebrow}>Pigmentação Óxido de Ferro NBR</p>
            <h2 className={styles.h2}>Cores Minerais Integradas na Massa</h2>
            <p className={styles.lead}>
              Não é pintura superficial: a pigmentação é homogênea durante a dosagem do concreto, garantindo
              tonalidade consistente mesmo após abrasão e exposição solar severa.
            </p>
          </div>

          <div className={styles.colorGrid}>
            {product.colors.map((c) => (
              <div key={c} className={styles.colorCard}>
                <span className={styles.swatch} style={{ background: colorHex[c] }} />
                <strong>{c}</strong>
                <span>Pigmento mineral</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={`container ${styles.techGrid}`}>
          <div>
            <p className={styles.eyebrow}>Laudos e Padrões Oficiais</p>
            <h2 className={styles.h2}>Ficha Técnica Industrial &amp; Logística</h2>
            <p className={styles.lead} style={{ marginBottom: 16 }}>
              Produzido em ambiente fabril automatizado, com controle granulométrico contínuo e ensaios periódicos
              de compressão diametral e absorção de água.
            </p>
            <table className={styles.techTable}>
              <tbody>
                <tr>
                  <td>Dimensões de fabricação (L x C)</td>
                  <td>100 mm x 200 mm</td>
                </tr>
                <tr>
                  <td>Espessuras disponíveis</td>
                  <td>40 · 60 · 80 mm</td>
                </tr>
                <tr>
                  <td>Consumo nominal por m²</td>
                  <td>50 peças / m²</td>
                </tr>
                <tr>
                  <td>Resistência característica (fck)</td>
                  <td>≥ 35 MPa (padrão) · 50 MPa (pesado)</td>
                </tr>
                <tr>
                  <td>Absorção de água média</td>
                  <td>≤ 6%</td>
                </tr>
                <tr>
                  <td>Resistência à abrasão</td>
                  <td>≤ 20 mm de desgaste</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.logisticsCard}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 8 }}>
                Embalagem Paletizada &amp; Descarga Mecanizada
              </h3>
              <p style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: '20px' }}>
                Paletes padronizados com filme protetor termoencolhível. Capacidade de 9 a 13 m² por palete,
                conforme espessura, com frota própria de caminhão munck para descarga sem danos ao canteiro.
              </p>
            </div>
            <p className={styles.eyebrow}>Documentação para download imediato</p>
            <div className={styles.docLinks}>
              <a href="#orcamento">Ficha Técnica (PDF)</a>
              <a href="#orcamento">Manchetes CAD &amp; BIM (DWG/RFA)</a>
            </div>
          </div>
        </div>
      </section>

      <section id="simulador" className={styles.section}>
        <div className={`container ${styles.sectionInner}`}>
          <div>
            <p className={styles.eyebrow}>Planejamento e Engenharia</p>
            <h2 className={styles.h2}>Simulador Rápido de Quantitativo e Paletes</h2>
            <p className={styles.lead}>
              Insira a área total de pavimentação para calcular o volume estimado de peças, a margem técnica de
              recorte e a quantidade de paletes de canteiro.
            </p>
          </div>
          <Simulator />
        </div>
      </section>

      <div id="orcamento">
        <QuoteSection />
      </div>
    </>
  )
}
