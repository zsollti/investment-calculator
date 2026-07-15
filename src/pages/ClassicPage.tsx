import InvestmentForm from '../components/InvestmentForm'
import GrowthChart from '../components/GrowthChart'
import SummaryStats from '../components/SummaryStats'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { CURRENCIES } from '../currency'
import type { PageProps } from './pageProps'
import './ClassicPage.css'

function ClassicPage({ calc, currency, onCurrencyChange }: PageProps) {
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
    <div className="page-classic">
      <header className="classic-header">
        <h1>Investment Growth Calculator</h1>
        <p>See how your initial and monthly investments could grow over {INVESTMENT_HORIZON_YEARS} years.</p>

        <div className="classic-currency-toggle">
          {CURRENCIES.map((option) => (
            <button
              key={option.code}
              type="button"
              className={`classic-currency-pill${option.code === currency ? ' active' : ''}`}
              aria-pressed={option.code === currency}
              onClick={() => onCurrencyChange(option.code)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <main className="classic-main">
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

        {result ? (
          <div className="classic-results">
            <SummaryStats result={result} currency={currency} years={calc.visibleYears} />
            <GrowthChart
              data={result.yearlyData}
              currency={currency}
              visibleYears={calc.visibleYears}
              onZoom={calc.zoomVisibleYears}
            />
          </div>
        ) : (
          <p className="classic-placeholder">Fix the highlighted fields to see your projection.</p>
        )}
      </main>
    </div>
  )
}

export default ClassicPage
