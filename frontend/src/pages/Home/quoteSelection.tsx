import { useState, type ReactNode } from 'react'
import { QuoteSelectionContext } from './quoteSelectionContext'

export function QuoteSelectionProvider({ children }: { children: ReactNode }) {
  const [model, setModel] = useState('')
  return <QuoteSelectionContext.Provider value={{ model, setModel }}>{children}</QuoteSelectionContext.Provider>
}
