export type CurrencyCode = 'eur' | 'usd' | 'huf'

export interface CurrencyOption {
  code: CurrencyCode
  label: string
  symbol: string
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'eur', label: 'EUR', symbol: '€' },
  { code: 'usd', label: 'USD', symbol: '$' },
  { code: 'huf', label: 'HUF', symbol: 'Ft' },
]

export const DEFAULT_CURRENCY: CurrencyCode = 'eur'
export const CURRENCY_STORAGE_KEY = 'investment-calculator-currency'
