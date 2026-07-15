import { useCallback, useMemo, useState } from 'react'
import {
  calculateInvestmentGrowth,
  DEFAULT_VISIBLE_YEARS,
  MAX_VISIBLE_YEARS,
  MIN_VISIBLE_YEARS,
} from '../calculations'
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
  visibleYears: number
  setInitialInvestment: (value: string) => void
  setMonthlyInvestment: (value: string) => void
  setAnnualRatePercent: (value: string) => void
  zoomVisibleYears: (deltaYears: number) => void
}

export function useInvestmentCalculator(): InvestmentCalculator {
  const [initialInvestment, setInitialInvestment] = useState('10000')
  const [monthlyInvestment, setMonthlyInvestment] = useState('200')
  const [annualRatePercent, setAnnualRatePercent] = useState('7')
  const [visibleYears, setVisibleYears] = useState(DEFAULT_VISIBLE_YEARS)

  const zoomVisibleYears = useCallback((deltaYears: number) => {
    setVisibleYears((prev) => Math.min(MAX_VISIBLE_YEARS, Math.max(MIN_VISIBLE_YEARS, prev + deltaYears)))
  }, [])

  const parsedInputs: ParsedInvestmentInputs = {
    initialInvestment: parseField(initialInvestment),
    monthlyInvestment: parseField(monthlyInvestment),
    annualRatePercent: parseField(annualRatePercent),
  }

  const errors = validateInvestmentInputs(parsedInputs)
  const isValid = Object.keys(errors).length === 0

  const fullResult = useMemo(() => {
    if (!isValid) return null
    return calculateInvestmentGrowth({
      initialInvestment: parsedInputs.initialInvestment as number,
      monthlyInvestment: parsedInputs.monthlyInvestment as number,
      annualRatePercent: parsedInputs.annualRatePercent as number,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, parsedInputs.initialInvestment, parsedInputs.monthlyInvestment, parsedInputs.annualRatePercent])

  const result = useMemo<InvestmentResult | null>(() => {
    if (!fullResult) return null
    const yearlyData = fullResult.yearlyData.slice(0, visibleYears + 1)
    const lastPoint = yearlyData[yearlyData.length - 1]
    return {
      yearlyData,
      finalBalance: lastPoint.balance,
      totalContributed: lastPoint.contributed,
      totalInterest: lastPoint.balance - lastPoint.contributed,
    }
  }, [fullResult, visibleYears])

  return {
    initialInvestment,
    monthlyInvestment,
    annualRatePercent,
    errors,
    result,
    visibleYears,
    setInitialInvestment,
    setMonthlyInvestment,
    setAnnualRatePercent,
    zoomVisibleYears,
  }
}
