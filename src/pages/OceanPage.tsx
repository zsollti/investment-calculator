import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { formatCurrency } from '../format'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './OceanPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

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

function OceanPage({ calc }: PageProps) {
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
    <div className="page-ocean">
      <header className="ocean-header">
        <h1>Investment Growth Calculator</h1>
        <p>Plan your {INVESTMENT_HORIZON_YEARS}-year investment journey.</p>
      </header>

      <div className="ocean-card-grid">
        <InputCard
          label="Initial investment"
          value={initialInvestment}
          suffix="€"
          error={errors.initialInvestment}
          onChange={setInitialInvestment}
        />
        <InputCard
          label="Monthly investment"
          value={monthlyInvestment}
          suffix="€"
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
      </div>

      {result ? (
        <>
          <div className="ocean-hero-card">
            <div className="ocean-hero-main">
              <span className="ocean-hero-label">Final balance</span>
              <span className="ocean-hero-value">{formatCurrency(result.finalBalance)}</span>
            </div>
            <div className="ocean-hero-sub-stats">
              <div>
                <span className="ocean-hero-sub-label">Contributed</span>
                <span className="ocean-hero-sub-value">{formatCurrency(result.totalContributed)}</span>
              </div>
              <div>
                <span className="ocean-hero-sub-label">Interest earned</span>
                <span className="ocean-hero-sub-value">{formatCurrency(result.totalInterest)}</span>
              </div>
            </div>
          </div>
          <GrowthChart data={result.yearlyData} />
        </>
      ) : (
        <p className="ocean-placeholder">Fix the highlighted cards above to see your projection.</p>
      )}
    </div>
  )
}

export default OceanPage
