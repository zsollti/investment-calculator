import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { CURRENCIES } from '../currency'
import { formatCurrency } from '../format'
import type { PageProps } from './pageProps'
import './OceanPage.css'

interface InputCardProps {
  label: string
  value: string
  suffix: string
  error?: string
  onChange: (value: string) => void
}

function InputCard({ label, value, suffix, error, onChange }: InputCardProps) {
  return (
    <div className="ocean-card">
      <span className="ocean-card-label">{label}</span>
      <div className="ocean-card-input-row">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
        <span className="ocean-card-suffix">{suffix}</span>
      </div>
      {error && <span className="ocean-card-error">{error}</span>}
    </div>
  )
}

function OceanPage({ calc, currency, onCurrencyChange }: PageProps) {
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
    <div className="page-ocean">
      <header className="ocean-header">
        <h1>Investment Growth Calculator</h1>
        <p>Plan your {INVESTMENT_HORIZON_YEARS}-year investment journey.</p>
      </header>

      <div className="ocean-card-grid">
        <InputCard
          label="Initial investment"
          value={initialInvestment}
          suffix={currencySymbol}
          error={errors.initialInvestment}
          onChange={setInitialInvestment}
        />
        <InputCard
          label="Monthly investment"
          value={monthlyInvestment}
          suffix={currencySymbol}
          error={errors.monthlyInvestment}
          onChange={setMonthlyInvestment}
        />
        <InputCard
          label="Annual return"
          value={annualRatePercent}
          suffix="%"
          error={errors.annualRatePercent}
          onChange={setAnnualRatePercent}
        />
        <div className="ocean-card ocean-currency-card">
          <span className="ocean-card-label">Currency</span>
          <div className="ocean-currency-buttons">
            {CURRENCIES.map((option) => (
              <button
                key={option.code}
                type="button"
                className={`ocean-currency-button${option.code === currency ? ' active' : ''}`}
                aria-pressed={option.code === currency}
                onClick={() => onCurrencyChange(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <>
          <div className="ocean-hero-card">
            <div className="ocean-hero-main">
              <span className="ocean-hero-label">Final balance after {calc.visibleYears} years</span>
              <span className="ocean-hero-value">{formatCurrency(result.finalBalance, currency)}</span>
            </div>
            <div className="ocean-hero-sub-stats">
              <div>
                <span className="ocean-hero-sub-label">Contributed</span>
                <span className="ocean-hero-sub-value">{formatCurrency(result.totalContributed, currency)}</span>
              </div>
              <div>
                <span className="ocean-hero-sub-label">Interest earned</span>
                <span className="ocean-hero-sub-value">{formatCurrency(result.totalInterest, currency)}</span>
              </div>
            </div>
          </div>
          <GrowthChart
            data={result.yearlyData}
            currency={currency}
            visibleYears={calc.visibleYears}
            onZoom={calc.zoomVisibleYears}
          />
        </>
      ) : (
        <p className="ocean-placeholder">Fix the highlighted cards above to see your projection.</p>
      )}
    </div>
  )
}

export default OceanPage
