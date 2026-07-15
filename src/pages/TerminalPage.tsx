import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { formatCurrency } from '../format'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './TerminalPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

function TerminalPage({ calc }: PageProps) {
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
            <span className="terminal-prompt">$</span> initial_investment =
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              aria-invalid={Boolean(errors.initialInvestment)}
            />
            €
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
            €
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
              <p className="terminal-line terminal-comment"># running {INVESTMENT_HORIZON_YEARS}-year projection...</p>
              <p className="terminal-line">&gt; final_balance&nbsp;&nbsp;&nbsp;&nbsp;{formatCurrency(result.finalBalance)}</p>
              <p className="terminal-line">&gt; total_contributed&nbsp;&nbsp;{formatCurrency(result.totalContributed)}</p>
              <p className="terminal-line">&gt; total_interest&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formatCurrency(result.totalInterest)}</p>
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
            <GrowthChart data={result.yearlyData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalPage
