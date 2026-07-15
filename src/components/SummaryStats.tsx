import type { InvestmentResult } from '../types'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { formatCurrency } from '../format'
import './SummaryStats.css'

interface SummaryStatsProps {
  result: InvestmentResult
}

function SummaryStats({ result }: SummaryStatsProps) {
  return (
    <div className="summary-stats">
      <div className="summary-card">
        <span className="summary-label">Final balance ({INVESTMENT_HORIZON_YEARS}y)</span>
        <span className="summary-value">{formatCurrency(result.finalBalance)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total contributed</span>
        <span className="summary-value">{formatCurrency(result.totalContributed)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total interest earned</span>
        <span className="summary-value">{formatCurrency(result.totalInterest)}</span>
      </div>
    </div>
  )
}

export default SummaryStats
