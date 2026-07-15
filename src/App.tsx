import { useMemo, useState } from 'react'
import InvestmentForm from './components/InvestmentForm'
import GrowthChart from './components/GrowthChart'
import SummaryStats from './components/SummaryStats'
import { calculateInvestmentGrowth, INVESTMENT_HORIZON_YEARS } from './calculations'
import { validateInvestmentInputs } from './validation'
import type { ParsedInvestmentInputs } from './types'
import './App.css'

function parseField(value: string): number | null {
  return value.trim() === '' ? null : Number(value)
}

function App() {
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [monthlyInvestment, setMonthlyInvestment] = useState('200')
  const [annualRatePercent, setAnnualRatePercent] = useState('7')

  const parsedInputs: ParsedInvestmentInputs = {
    initialInvestment: parseField(initialInvestment),
    monthlyInvestment: parseField(monthlyInvestment),
    annualRatePercent: parseField(annualRatePercent),
  }

  const errors = validateInvestmentInputs(parsedInputs)
  const isValid = Object.keys(errors).length === 0

  const result = useMemo(() => {
    if (!isValid) return null
    return calculateInvestmentGrowth({
      initialInvestment: parsedInputs.initialInvestment as number,
      monthlyInvestment: parsedInputs.monthlyInvestment as number,
      annualRatePercent: parsedInputs.annualRatePercent as number,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, parsedInputs.initialInvestment, parsedInputs.monthlyInvestment, parsedInputs.annualRatePercent])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Investment Growth Calculator</h1>
        <p>See how your initial and monthly investments could grow over {INVESTMENT_HORIZON_YEARS} years.</p>
      </header>

      <main className="app-main">
        <InvestmentForm
          initialInvestment={initialInvestment}
          monthlyInvestment={monthlyInvestment}
          annualRatePercent={annualRatePercent}
          errors={errors}
          onInitialInvestmentChange={setInitialInvestment}
          onMonthlyInvestmentChange={setMonthlyInvestment}
          onAnnualRateChange={setAnnualRatePercent}
        />

        {result ? (
          <div className="results">
            <SummaryStats result={result} />
            <GrowthChart data={result.yearlyData} />
          </div>
        ) : (
          <p className="results-placeholder">Fix the highlighted fields to see your projection.</p>
        )}
      </main>
    </div>
  )
}

export default App
