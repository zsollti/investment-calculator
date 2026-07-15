import type { CurrencyCode } from './currency'

const LOCALE_BY_CURRENCY: Record<CurrencyCode, string> = {
  eur: 'de-DE',
  usd: 'en-US',
  huf: 'hu-HU',
}

const ISO_BY_CURRENCY: Record<CurrencyCode, string> = {
  eur: 'EUR',
  usd: 'USD',
  huf: 'HUF',
}

const formatterCache = new Map<string, Intl.NumberFormat>()

function getFormatter(currency: CurrencyCode, compact: boolean): Intl.NumberFormat {
  const key = `${currency}-${compact}`
  const cached = formatterCache.get(key)
  if (cached) return cached

  const formatter = new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: 'currency',
    currency: ISO_BY_CURRENCY[currency],
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  })
  formatterCache.set(key, formatter)
  return formatter
}

export function formatCurrency(value: number, currency: CurrencyCode, compact = false): string {
  return getFormatter(currency, compact).format(value)
}
