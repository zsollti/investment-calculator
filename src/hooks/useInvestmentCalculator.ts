import { useMemo, useState } from 'react'
import { calculateInvestmentGrowth } from '../calculations'
import { validateInvestmentInputs } from '../validation'
import type { InvestmentFieldErrors, InvestmentResult, ParsedInvestmentInputs } from '../types'

function parseField(value: string): number | null {
  return value.trim() === '' ? null : Number(value)
}

export interface InvestmentCalculator {
  initialInvestment: string
  monthlyInvestment: string
  annualRatePercent: string
  errors: InvestmentFieldErrors
  result: InvestmentResult | null
  setInitialInvestment: (value: string) => void
  setMonthlyInvestment: (value: string) => void
  setAnnualRatePercent: (value: string) => void
}

export function useInvestmentCalculator(): InvestmentCalculator {
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

  return {
    initialInvestment,
    monthlyInvestment,
    annualRatePercent,
    errors,
    result,
    setInitialInvestment,
    setMonthlyInvestment,
    setAnnualRatePercent,
  }
}
