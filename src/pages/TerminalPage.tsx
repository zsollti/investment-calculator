import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { CURRENCIES } from '../currency'
import { formatCurrency } from '../format'
import type { PageProps } from './pageProps'
import './TerminalPage.css'

function TerminalPage({ calc, currency, onCurrencyChange }: PageProps) {
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
    <div className="page-terminal">
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-title">investment-calculator — bash — {INVESTMENT_HORIZON_YEARS}y</span>
        </div>

        <div className="terminal-body">
          <p className="terminal-line terminal-comment"># set your investment parameters</p>

          <p className="terminal-line">
            <span className="terminal-prompt">$</span> currency = [
            {CURRENCIES.map((option, index) => (
              <span key={option.code}>
                {index > 0 && <span className="terminal-token-separator">|</span>}
                <button
                  type="button"
                  className={`terminal-token${option.code === currency ? ' active' : ''}`}
                  aria-pressed={option.code === currency}
                  onClick={() => onCurrencyChange(option.code)}
                >
                  {option.code}
                </button>
              </span>
            ))}
            ]
          </p>

          <p className="terminal-line">
            <span className="terminal-prompt">$</span> initial_investment =
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              aria-invalid={Boolean(errors.initialInvestment)}
            />
            {currencySymbol}
          </p>
          {errors.initialInvestment && <p className="terminal-line terminal-error">! {errors.initialInvestment}</p>}

          <p className="terminal-line">
            <span className="terminal-prompt">$</span> monthly_investment =
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              aria-invalid={Boolean(errors.monthlyInvestment)}
            />
            {currencySymbol}
          </p>
          {errors.monthlyInvestment && <p className="terminal-line terminal-error">! {errors.monthlyInvestment}</p>}

          <p className="terminal-line">
            <span className="terminal-prompt">$</span> annual_rate =
            <input
              type="number"
              value={annualRatePercent}
              onChange={(e) => setAnnualRatePercent(e.target.value)}
              aria-invalid={Boolean(errors.annualRatePercent)}
            />
            %
          </p>
          {errors.annualRatePercent && <p className="terminal-line terminal-error">! {errors.annualRatePercent}</p>}

          {result ? (
            <>
              <p className="terminal-line terminal-comment"># running {calc.visibleYears}-year projection... (scroll on chart to zoom)</p>
              <p className="terminal-line">&gt; final_balance&nbsp;&nbsp;&nbsp;&nbsp;{formatCurrency(result.finalBalance, currency)}</p>
              <p className="terminal-line">&gt; total_contributed&nbsp;&nbsp;{formatCurrency(result.totalContributed, currency)}</p>
              <p className="terminal-line">&gt; total_interest&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatCurrency(result.totalInterest, currency)}</p>
            </>
          ) : (
            <p className="terminal-line terminal-error"># fix the invalid parameters above to run the projection</p>
          )}
        </div>
      </div>

      {result && (
        <div className="terminal-window terminal-chart-window">
          <div className="terminal-titlebar">
            <span className="terminal-dot" />
            <span className="terminal-dot" />
            <span className="terminal-dot" />
            <span className="terminal-title">chart.plot</span>
          </div>
          <div className="terminal-chart-body">
            <GrowthChart
              data={result.yearlyData}
              currency={currency}
              visibleYears={calc.visibleYears}
              onZoom={calc.zoomVisibleYears}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalPage
