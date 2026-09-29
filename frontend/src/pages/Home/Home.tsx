import { QuoteSelectionProvider } from './quoteSelection'
import { Benefits } from './sections/Benefits'
import { Catalog } from './sections/Catalog'
import { Faq } from './sections/Faq'
import { Hero } from './sections/Hero'
import { Metrics } from './sections/Metrics'
import { Process } from './sections/Process'
import { Projects } from './sections/Projects'
import { QuoteForm } from './sections/QuoteForm'
import { TrustBar } from './sections/TrustBar'
import { UsageGuide } from './sections/UsageGuide'

export default function Home() {
  return (
    <QuoteSelectionProvider>
      <Hero />
      <TrustBar />
      <Catalog />
      <UsageGuide />
      <Benefits />
      <Projects />
      <Process />
      <Metrics />
      <Faq />
      <QuoteForm />
    </QuoteSelectionProvider>
  )
}
