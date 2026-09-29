// Catálogo oficial da Blokasa. Enquanto a API não existe, a home e o formulário leem daqui;
// os mesmos dados serão o seed da tabela de produtos no MySQL.

export type Color = 'Natural' | 'Vermelho' | 'Grafite' | 'Amarelo' | 'Terracota'

export type CategoryId = 'pisos-intertravados' | 'pisos-drenantes' | 'placas' | 'guias' | 'blocos'

export interface Measure {
  /** largura x comprimento x altura, em cm */
  width: number
  length: number
  height: number
}

export interface Product {
  slug: string
  name: string
  category: CategoryId
  measures: Measure[]
  colors: Color[]
}

export const categories: Record<CategoryId, string> = {
  'pisos-intertravados': 'Pisos intertravados',
  'pisos-drenantes': 'Pisos drenantes',
  placas: 'Placas',
  guias: 'Guias',
  blocos: 'Blocos',
}

const allColors: Color[] = ['Natural', 'Vermelho', 'Grafite', 'Amarelo', 'Terracota']
const natural: Color[] = ['Natural']

const m = (width: number, length: number, height: number): Measure => ({ width, length, height })

export const products: Product[] = [
  {
    slug: 'piso-intertravado-sextavado',
    name: 'Piso intertravado sextavado',
    category: 'pisos-intertravados',
    measures: [m(25, 25, 6), m(25, 25, 8), m(30, 30, 8)],
    colors: allColors,
  },
  {
    slug: 'piso-intertravado-onda-16-faces',
    name: 'Piso intertravado onda 16 faces',
    category: 'pisos-intertravados',
    measures: [m(22, 11, 6), m(22, 11, 8), m(22, 11, 10)],
    colors: allColors,
  },
  {
    slug: 'piso-intertravado-retangular',
    name: 'Piso intertravado retangular',
    category: 'pisos-intertravados',
    measures: [m(20, 10, 4), m(20, 10, 6), m(20, 10, 8)],
    colors: allColors,
  },
  {
    slug: 'piso-intertravado-grama',
    name: 'Piso intertravado grama',
    category: 'pisos-intertravados',
    measures: [m(60, 45, 9.5), m(50, 50, 9.5)],
    colors: allColors,
  },
  {
    slug: 'piso-drenante-sextavado',
    name: 'Piso drenante sextavado',
    category: 'pisos-drenantes',
    measures: [m(25, 25, 6), m(25, 25, 8), m(30, 30, 8)],
    colors: allColors,
  },
  {
    slug: 'piso-drenante-retangular',
    name: 'Piso drenante retangular',
    category: 'pisos-drenantes',
    measures: [m(20, 10, 4), m(20, 10, 6), m(20, 10, 8)],
    colors: allColors,
  },
  {
    slug: 'placa-drenante',
    name: 'Placa drenante',
    category: 'placas',
    measures: [m(40, 40, 6)],
    colors: allColors,
  },
  {
    slug: 'guia-padrao-sao-paulo',
    name: 'Guia padrão São Paulo',
    category: 'guias',
    measures: [m(15, 30, 100)],
    colors: natural,
  },
  {
    slug: 'mini-guia-jardim',
    name: 'Mini guia jardim',
    category: 'guias',
    measures: [m(8, 19, 39)],
    colors: natural,
  },
  {
    slug: 'bloco-estrutural',
    name: 'Bloco estrutural',
    category: 'blocos',
    measures: [m(14, 19, 39)],
    colors: natural,
  },
  {
    slug: 'meio-bloco-estrutural',
    name: 'Meio bloco estrutural',
    category: 'blocos',
    measures: [m(14, 19, 19)],
    colors: natural,
  },
  {
    slug: 'bloco-vedacao',
    name: 'Bloco vedação',
    category: 'blocos',
    measures: [m(9, 19, 39), m(14, 19, 39), m(19, 19, 39)],
    colors: natural,
  },
]

const cm = (n: number) => String(n).replace('.', ',')
const pad = (n: number) => (Number.isInteger(n) && n < 10 ? `0${n}` : cm(n))

/** "20 x 10 x 06 cm", no formato usado pela Blokasa */
export const formatMeasure = ({ width, length, height }: Measure) =>
  `${pad(width)} x ${pad(length)} x ${pad(height)} cm`

/** "6cm • 8cm", a partir das alturas disponíveis */
export const formatThicknesses = (p: Product) =>
  [...new Set(p.measures.map((x) => x.height))].map((h) => `${cm(h)}cm`).join(' • ')

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

/** Hex de referência para cada cor mineral do catálogo (para suásculas de cor na página de produto). */
export const colorHex: Record<Color, string> = {
  Natural: '#c9c2b4',
  Vermelho: '#a13c2e',
  Grafite: '#4a4a48',
  Amarelo: '#c99a3a',
  Terracota: '#b56a45',
}

/** Peças por m² e capacidade de carga por espessura, para a página de produto do Retangular. */
export const rectangularSpecs = [
  {
    height: 4,
    traffic: 'Tráfego Leve • Pedestres',
    resistance: '≥ 35 MPa',
    uses: ['Calçadas e passeios urbanos', 'Ciclovias e pátios de lazer', 'Áreas internas cobertas'],
    weight: '≈ 100 kg/peça • ≈ 100 kg/m²',
    featured: false,
  },
  {
    height: 6,
    traffic: 'Tráfego Médio • Veículos leves',
    resistance: '≥ 35 MPa',
    uses: ['Garagens residenciais e condominiais', 'Vias internas e calçadas', 'Acessos veiculares contínuos'],
    weight: '≈ 130 kg/m²',
    featured: true,
  },
  {
    height: 8,
    traffic: 'Tráfego Pesado',
    resistance: '≥ 50 MPa',
    uses: ['Vias urbanas e comerciais', 'Estacionamentos e pátios', 'Acessos de serviço e frota'],
    weight: '≈ 175 kg/m²',
    featured: false,
  },
] as const
