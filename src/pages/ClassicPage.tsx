import InvestmentForm from '../components/InvestmentForm'
import GrowthChart from '../components/GrowthChart'
import SummaryStats from '../components/SummaryStats'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './ClassicPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

function ClassicPage({ calc }: PageProps) {
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
    <div className="page-classic">
      <header className="classic-header">
        <h1>Investment Growth Calculator</h1>
        <p>See how your initial and monthly investments could grow over {INVESTMENT_HORIZON_YEARS} years.</p>
      </header>

      <main className="classic-main">
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
          <div className="classic-results">
            <SummaryStats result={result} />
            <GrowthChart data={result.yearlyData} />
          </div>
        ) : (
          <p className="classic-placeholder">Fix the highlighted fields to see your projection.</p>
        )}
      </main>
    </div>
  )
}

export default ClassicPage
