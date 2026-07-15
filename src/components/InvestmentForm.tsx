import type { InvestmentFieldErrors } from '../types'

interface InvestmentFormProps {
  initialInvestment: string
  monthlyInvestment: string
  annualRatePercent: string
  errors: InvestmentFieldErrors
  onInitialInvestmentChange: (value: string) => void
  onMonthlyInvestmentChange: (value: string) => void
  onAnnualRateChange: (value: string) => void
}

function InvestmentForm({
  initialInvestment,
  monthlyInvestment,
  annualRatePercent,
  errors,
  onInitialInvestmentChange,
  onMonthlyInvestmentChange,
  onAnnualRateChange,
}: InvestmentFormProps) {
  return (
    <form className="investment-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-field">
        <label htmlFor="initial-investment">Initial investment (€)</label>
        <input
          id="initial-investment"
          type="number"
          min="0"
          step="100"
          value={initialInvestment}
          onChange={(e) => onInitialInvestmentChange(e.target.value)}
          aria-invalid={Boolean(errors.initialInvestment)}
        />
        {errors.initialInvestment && <span className="field-error">{errors.initialInvestment}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="monthly-investment">Monthly investment (€)</label>
        <input
          id="monthly-investment"
          type="number"
          min="0"
          step="10"
          value={monthlyInvestment}
          onChange={(e) => onMonthlyInvestmentChange(e.target.value)}
          aria-invalid={Boolean(errors.monthlyInvestment)}
        />
        {errors.monthlyInvestment && <span className="field-error">{errors.monthlyInvestment}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="annual-rate">Expected annual return (%)</label>
        <input
          id="annual-rate"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={annualRatePercent}
          onChange={(e) => onAnnualRateChange(e.target.value)}
          aria-invalid={Boolean(errors.annualRatePercent)}
        />
        {errors.annualRatePercent && <span className="field-error">{errors.annualRatePercent}</span>}
      </div>
    </form>
  )
}

export default InvestmentForm
