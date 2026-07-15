import type { InvestmentResult } from '../types'
import type { CurrencyCode } from '../currency'
import { formatCurrency } from '../format'
import './SummaryStats.css'

interface SummaryStatsProps {
  result: InvestmentResult
  currency: CurrencyCode
  years: number
}

function SummaryStats({ result, currency, years }: SummaryStatsProps) {
  return (
    <div className="summary-stats">
      <div className="summary-card">
        <span className="summary-label">Final balance ({years}y)</span>
        <span className="summary-value">{formatCurrency(result.finalBalance, currency)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total contributed</span>
        <span className="summary-value">{formatCurrency(result.totalContributed, currency)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total interest earned</span>
        <span className="summary-value">{formatCurrency(result.totalInterest, currency)}</span>
      </div>
    </div>
  )
}

export default SummaryStats
