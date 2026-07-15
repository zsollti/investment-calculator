import type { InvestmentParams, InvestmentResult, YearlyDataPoint } from './types'

export const INVESTMENT_HORIZON_YEARS = 30
export const MIN_VISIBLE_YEARS = 5
export const MAX_VISIBLE_YEARS = 30
export const DEFAULT_VISIBLE_YEARS = 10
const MONTHS_PER_YEAR = 12

export function calculateInvestmentGrowth(params: InvestmentParams): InvestmentResult {
  const { initialInvestment, monthlyInvestment, annualRatePercent } = params
  const monthlyRate = annualRatePercent / 100 / MONTHS_PER_YEAR

  const yearlyData: YearlyDataPoint[] = [
    { year: 0, balance: initialInvestment, contributed: initialInvestment },
  ]

  let balance = initialInvestment
  let contributed = initialInvestment

  for (let month = 1; month <= INVESTMENT_HORIZON_YEARS * MONTHS_PER_YEAR; month++) {
    balance = balance * (1 + monthlyRate) + monthlyInvestment
    contributed += monthlyInvestment

    if (month % MONTHS_PER_YEAR === 0) {
      yearlyData.push({ year: month / MONTHS_PER_YEAR, balance, contributed })
    }
  }

  const finalBalance = yearlyData[yearlyData.length - 1].balance

  return {
    yearlyData,
    finalBalance,
    totalContributed: contributed,
    totalInterest: finalBalance - contributed,
  }
}
