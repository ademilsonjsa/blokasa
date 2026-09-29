import { useContext } from 'react'
import { QuoteSelectionContext } from './quoteSelectionContext'

export function useQuoteSelection() {
  const ctx = useContext(QuoteSelectionContext)
  if (!ctx) throw new Error('useQuoteSelection precisa de QuoteSelectionProvider')
  return ctx
}
