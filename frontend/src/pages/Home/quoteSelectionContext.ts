import { createContext } from 'react'

/** Guarda o modelo escolhido num card do catálogo para já vir marcado no formulário de orçamento. */
export interface QuoteSelection {
  model: string
  setModel: (slug: string) => void
}

export const QuoteSelectionContext = createContext<QuoteSelection | null>(null)
