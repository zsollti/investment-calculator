import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { CURRENCIES } from '../currency'
import { formatCurrency } from '../format'
import type { PageProps } from './pageProps'
import './MonoPage.css'

function MonoPage({ calc, currency, onCurrencyChange }: PageProps) {
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

  const currencySymbol = CURRENCIES.find((option) => option.code === currency)?.symbol ?? ''

  return (
    <div className="page-mono">
      <header className="mono-header">
        <h1>Investment Growth Calculator</h1>
        <p>{INVESTMENT_HORIZON_YEARS}-year projection, monthly compounding.</p>
      </header>

      <table className="mono-table">
        <tbody>
          <tr>
            <th>Currency</th>
            <td>
              <div className="mono-currency-buttons">
                {CURRENCIES.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`mono-currency-button${option.code === currency ? ' active' : ''}`}
                    aria-pressed={option.code === currency}
                    onClick={() => onCurrencyChange(option.code)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <th>Initial investment ({currencySymbol})</th>
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
            <th>Monthly investment ({currencySymbol})</th>
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
                <th>Final balance (year {calc.visibleYears})</th>
                <td>{formatCurrency(result.finalBalance, currency)}</td>
              </tr>
              <tr>
                <th>Total contributed</th>
                <td>{formatCurrency(result.totalContributed, currency)}</td>
              </tr>
              <tr>
                <th>Total interest earned</th>
                <td>{formatCurrency(result.totalInterest, currency)}</td>
              </tr>
            </tbody>
          </table>
          <GrowthChart
            data={result.yearlyData}
            currency={currency}
            visibleYears={calc.visibleYears}
            onZoom={calc.zoomVisibleYears}
          />
        </>
      ) : (
        <p className="mono-placeholder">Fix the highlighted fields above to see your projection.</p>
      )}
    </div>
  )
}

export default MonoPage
