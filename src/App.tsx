import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import ClassicPage from './pages/ClassicPage'
import MidnightPage from './pages/MidnightPage'
import SunsetPage from './pages/SunsetPage'
import OceanPage from './pages/OceanPage'
import MonoPage from './pages/MonoPage'
import TerminalPage from './pages/TerminalPage'
import { useInvestmentCalculator } from './hooks/useInvestmentCalculator'
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from './themes'
import { CURRENCY_STORAGE_KEY, DEFAULT_CURRENCY } from './currency'
import type { CurrencyCode } from './currency'
import type { PageProps } from './pages/pageProps'

const PAGES: Record<string, ComponentType<PageProps>> = {
  classic: ClassicPage,
  midnight: MidnightPage,
  sunset: SunsetPage,
  ocean: OceanPage,
  mono: MonoPage,
  terminal: TerminalPage,
}

function isCurrencyCode(value: string): value is CurrencyCode {
  return value === 'eur' || value === 'usd' || value === 'huf'
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME)
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY)
    return stored && isCurrencyCode(stored) ? stored : DEFAULT_CURRENCY
  })
  const calc = useInvestmentCalculator()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
  }, [currency])

  const Page = PAGES[theme] ?? ClassicPage

  return (
    <>
      <Page calc={calc} currency={currency} onCurrencyChange={setCurrency} />
      <ThemeSwitcher themes={THEMES} activeTheme={theme} onSelect={setTheme} />
    </>
  )
}

export default App
