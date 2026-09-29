import { company } from '../data/company'
import { categories, getProduct, products } from '../data/catalog'

export interface QuoteRequest {
  name: string
  phone: string
  email: string
  cityState: string
  projectType: string
  area: string
  model: string
  message: string
}

export const projectTypes = [
  'Residência / Garagem Particular',
  'Condomínio / Vias Internas',
  'Comercial / Estacionamento',
  'Industrial / Logística',
  'Obra Pública / Calçada',
  'Outro',
]

export const productOptions = products.map((p) => ({
  value: p.slug,
  label: p.name,
  group: categories[p.category],
}))

/**
 * Enquanto a API .NET não existe, o pedido segue pelo WhatsApp da Blokasa com a mensagem pronta.
 * Na próxima etapa esta função passa a fazer POST /api/orcamentos e gravar no MySQL.
 */
export function buildWhatsAppQuote(q: QuoteRequest) {
  const product = getProduct(q.model)?.name ?? 'A definir'
  const lines = [
    'Olá! Gostaria de um orçamento.',
    '',
    `Nome: ${q.name}`,
    `Telefone: ${q.phone}`,
    `E-mail: ${q.email}`,
    `Cidade/UF da obra: ${q.cityState}`,
    `Tipo de projeto: ${q.projectType}`,
    q.area ? `Metragem aproximada: ${q.area} m²` : null,
    `Produto: ${product}`,
    q.message ? `Observações: ${q.message}` : null,
  ].filter((l) => l !== null)

  return `${company.whatsapp.href}?text=${encodeURIComponent(lines.join('\n'))}`
}

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>

export function validateQuote(q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {}
  if (q.name.trim().length < 3) errors.name = 'Informe seu nome completo.'
  if (q.phone.replace(/\D/g, '').length < 10) errors.phone = 'Informe um telefone com DDD.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email.trim())) errors.email = 'Informe um e-mail válido.'
  if (q.cityState.trim().length < 3) errors.cityState = 'Informe a cidade e o estado da obra.'
  if (q.area && !(Number(q.area.replace(',', '.')) > 0)) errors.area = 'Informe a metragem em números.'
  return errors
}

/** (11) 98765-4321 */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
