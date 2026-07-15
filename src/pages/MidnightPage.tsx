import InvestmentForm from '../components/InvestmentForm'
import GrowthChart from '../components/GrowthChart'
import SummaryStats from '../components/SummaryStats'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { CURRENCIES } from '../currency'
import type { PageProps } from './pageProps'
import './MidnightPage.css'

function MidnightPage({ calc, currency, onCurrencyChange }: PageProps) {
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
    <div className="page-midnight">
      <aside className="midnight-sidebar">
        <h1>Investment Dashboard</h1>
        <p className="midnight-subtitle">{INVESTMENT_HORIZON_YEARS}-year projection</p>
        <InvestmentForm
          initialInvestment={initialInvestment}
          monthlyInvestment={monthlyInvestment}
          annualRatePercent={annualRatePercent}
          currencySymbol={currencySymbol}
          errors={errors}
          onInitialInvestmentChange={setInitialInvestment}
          onMonthlyInvestmentChange={setMonthlyInvestment}
          onAnnualRateChange={setAnnualRatePercent}
        />

        <div className="midnight-currency-panel">
          <span className="midnight-currency-title">Currency</span>
          {CURRENCIES.map((option) => (
            <button
              key={option.code}
              type="button"
              className={`midnight-currency-option${option.code === currency ? ' active' : ''}`}
              aria-pressed={option.code === currency}
              onClick={() => onCurrencyChange(option.code)}
            >
              {option.symbol} {option.label}
            </button>
          ))}
        </div>
      </aside>

      <main className="midnight-main">
        {result ? (
          <>
            <SummaryStats result={result} currency={currency} years={calc.visibleYears} />
            <GrowthChart
              data={result.yearlyData}
              currency={currency}
              visibleYears={calc.visibleYears}
              onZoom={calc.zoomVisibleYears}
            />
          </>
        ) : (
          <p className="midnight-placeholder">Fix the highlighted fields in the sidebar to see your projection.</p>
        )}
      </main>
    </div>
  )
}

export default MidnightPage
