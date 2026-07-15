import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import type { CurrencyCode } from '../currency'

export interface PageProps {
  calc: InvestmentCalculator
  currency: CurrencyCode
  onCurrencyChange: (currency: CurrencyCode) => void
}
