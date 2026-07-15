import GrowthChart from '../components/GrowthChart'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import { formatCurrency } from '../format'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './SunsetPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

interface SliderRowProps {
  label: string
  value: string
  min: number
  max: number
  step: number
  displayValue: string
  onChange: (value: string) => void
}

function safeNumber(value: string): number {
  const parsed = Number(value)
  return value.trim() === '' || Number.isNaN(parsed) ? 0 : parsed
}

function SliderRow({ label, value, min, max, step, displayValue, onChange }: SliderRowProps) {
  const numericValue = safeNumber(value)
  const sliderValue = value.trim() === '' || Number.isNaN(Number(value)) ? min : numericValue

  return (
    <div className="sunset-slider-row">
      <div className="sunset-slider-head">
        <span className="sunset-slider-label">{label}</span>
        <span className="sunset-slider-value">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function SunsetPage({ calc }: PageProps) {
  const { initialInvestment, monthlyInvestment, annualRatePercent, result, setInitialInvestment, setMonthlyInvestment, setAnnualRatePercent } = calc

  return (
    <div className="page-sunset">
      <header className="sunset-header">
        <h1>Grow your money</h1>
        <p>Drag the sliders and watch your {INVESTMENT_HORIZON_YEARS}-year projection change.</p>
      </header>

      <div className="sunset-sliders">
        <SliderRow
          label="Initial investment"
          value={initialInvestment}
          min={0}
          max={200000}
          step={500}
          displayValue={formatCurrency(safeNumber(initialInvestment))}
          onChange={setInitialInvestment}
        />
        <SliderRow
          label="Monthly investment"
          value={monthlyInvestment}
          min={0}
          max={5000}
          step={25}
          displayValue={formatCurrency(safeNumber(monthlyInvestment))}
          onChange={setMonthlyInvestment}
        />
        <SliderRow
          label="Annual return"
          value={annualRatePercent}
          min={0}
          max={20}
          step={0.25}
          displayValue={`${safeNumber(annualRatePercent)}%`}
          onChange={setAnnualRatePercent}
        />
      </div>

      {result ? (
        <>
          <div className="sunset-hero">
            <span className="sunset-hero-label">In {INVESTMENT_HORIZON_YEARS} years, you could have</span>
            <span className="sunset-hero-value">{formatCurrency(result.finalBalance)}</span>
            <span className="sunset-hero-sub">
              {formatCurrency(result.totalContributed)} contributed &middot; {formatCurrency(result.totalInterest)} in growth
            </span>
          </div>
          <GrowthChart data={result.yearlyData} />
        </>
      ) : (
        <p className="sunset-placeholder">Adjust the sliders to a valid range to see your projection.</p>
      )}
    </div>
  )
}

export default SunsetPage
