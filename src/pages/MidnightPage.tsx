import InvestmentForm from '../components/InvestmentForm'
import GrowthChart from '../components/GrowthChart'
import SummaryStats from '../components/SummaryStats'
import { INVESTMENT_HORIZON_YEARS } from '../calculations'
import type { InvestmentCalculator } from '../hooks/useInvestmentCalculator'
import './MidnightPage.css'

interface PageProps {
  calc: InvestmentCalculator
}

function MidnightPage({ calc }: PageProps) {
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
    <div className="page-midnight">
      <aside className="midnight-sidebar">
        <h1>Investment Dashboard</h1>
        <p className="midnight-subtitle">{INVESTMENT_HORIZON_YEARS}-year projection</p>
        <InvestmentForm
          initialInvestment={initialInvestment}
          monthlyInvestment={monthlyInvestment}
          annualRatePercent={annualRatePercent}
          errors={errors}
          onInitialInvestmentChange={setInitialInvestment}
          onMonthlyInvestmentChange={setMonthlyInvestment}
          onAnnualRateChange={setAnnualRatePercent}
        />
      </aside>

      <main className="midnight-main">
        {result ? (
          <>
            <SummaryStats result={result} />
            <GrowthChart data={result.yearlyData} />
          </>
        ) : (
          <p className="midnight-placeholder">Fix the highlighted fields in the sidebar to see your projection.</p>
        )}
      </main>
    </div>
  )
}

export default MidnightPage
