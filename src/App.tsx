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
import type { InvestmentCalculator } from './hooks/useInvestmentCalculator'

const PAGES: Record<string, ComponentType<{ calc: InvestmentCalculator }>> = {
  classic: ClassicPage,
  midnight: MidnightPage,
  sunset: SunsetPage,
  ocean: OceanPage,
  mono: MonoPage,
  terminal: TerminalPage,
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME)
  const calc = useInvestmentCalculator()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const Page = PAGES[theme] ?? ClassicPage

  return (
    <>
      <Page calc={calc} />
      <ThemeSwitcher themes={THEMES} activeTheme={theme} onSelect={setTheme} />
    </>
  )
}

export default App
