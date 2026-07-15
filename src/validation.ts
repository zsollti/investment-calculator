import type { InvestmentFieldErrors, ParsedInvestmentInputs } from './types'

const MAX_INITIAL_INVESTMENT = 100_000_000
const MAX_MONTHLY_INVESTMENT = 1_000_000
const MAX_ANNUAL_RATE_PERCENT = 100

export function validateInvestmentInputs(inputs: ParsedInvestmentInputs): InvestmentFieldErrors {
  const errors: InvestmentFieldErrors = {}

  if (inputs.initialInvestment === null || Number.isNaN(inputs.initialInvestment)) {
    errors.initialInvestment = 'Enter a number'
  } else if (inputs.initialInvestment < 0) {
    errors.initialInvestment = 'Must be 0 or more'
  } else if (inputs.initialInvestment > MAX_INITIAL_INVESTMENT) {
    errors.initialInvestment = 'Too large'
  }

  if (inputs.monthlyInvestment === null || Number.isNaN(inputs.monthlyInvestment)) {
    errors.monthlyInvestment = 'Enter a number'
  } else if (inputs.monthlyInvestment < 0) {
    errors.monthlyInvestment = 'Must be 0 or more'
  } else if (inputs.monthlyInvestment > MAX_MONTHLY_INVESTMENT) {
    errors.monthlyInvestment = 'Too large'
  }

  if (inputs.annualRatePercent === null || Number.isNaN(inputs.annualRatePercent)) {
    errors.annualRatePercent = 'Enter a number'
  } else if (inputs.annualRatePercent < 0) {
    errors.annualRatePercent = 'Must be 0 or more'
  } else if (inputs.annualRatePercent > MAX_ANNUAL_RATE_PERCENT) {
    errors.annualRatePercent = `Must be ${MAX_ANNUAL_RATE_PERCENT} or less`
  }

  return errors
}
