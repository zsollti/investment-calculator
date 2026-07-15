export interface InvestmentParams {
  initialInvestment: number
  monthlyInvestment: number
  annualRatePercent: number
}

export interface YearlyDataPoint {
  year: number
  balance: number
  contributed: number
}

export interface InvestmentResult {
  yearlyData: YearlyDataPoint[]
  finalBalance: number
  totalContributed: number
  totalInterest: number
}

export interface ParsedInvestmentInputs {
  initialInvestment: number | null
  monthlyInvestment: number | null
  annualRatePercent: number | null
}

export interface InvestmentFieldErrors {
  initialInvestment?: string
  monthlyInvestment?: string
  annualRatePercent?: string
}
