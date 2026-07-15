import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { formatCurrency } from '../format'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './MonoPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

function MonoPage({ calc }: PageProps) {
  const {
    initialInvestment,
    monthlyInvestment,
    annualRatePercent,
    errors,
    result,
    setInitialInvestment,
    setMonthlyInvestment,
    setAnnualRatePercent,
  } = calc

  return (
    <div className="page-mono">
      <header className="mono-header">
        <h1>Investment Growth Calculator</h1>
        <p>{INVESTMENT_HORIZON_YEARS}-year projection, monthly compounding.</p>
      </header>

      <table className="mono-table">
        <tbody>
          <tr>
            <th>Initial investment (€)</th>
            <td>
              <input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                aria-invalid={Boolean(errors.initialInvestment)}
              />
              {errors.initialInvestment && <span className="mono-error">{errors.initialInvestment}</span>}
            </td>
          </tr>
          <tr>
            <th>Monthly investment (€)</th>
            <td>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(e.target.value)}
                aria-invalid={Boolean(errors.monthlyInvestment)}
              />
              {errors.monthlyInvestment && <span className="mono-error">{errors.monthlyInvestment}</span>}
            </td>
          </tr>
          <tr>
            <th>Expected annual return (%)</th>
            <td>
              <input
                type="number"
                value={annualRatePercent}
                onChange={(e) => setAnnualRatePercent(e.target.value)}
                aria-invalid={Boolean(errors.annualRatePercent)}
              />
              {errors.annualRatePercent && <span className="mono-error">{errors.annualRatePercent}</span>}
            </td>
          </tr>
        </tbody>
      </table>

      {result ? (
        <>
          <table className="mono-table mono-results">
            <tbody>
              <tr>
                <th>Final balance</th>
                <td>{formatCurrency(result.finalBalance)}</td>
              </tr>
              <tr>
                <th>Total contributed</th>
                <td>{formatCurrency(result.totalContributed)}</td>
              </tr>
              <tr>
                <th>Total interest earned</th>
                <td>{formatCurrency(result.totalInterest)}</td>
              </tr>
            </tbody>
          </table>
          <GrowthChart data={result.yearlyData} />
        </>
      ) : (
        <p className="mono-placeholder">Fix the highlighted fields above to see your projection.</p>
      )}
    </div>
  )
}

export default MonoPage
