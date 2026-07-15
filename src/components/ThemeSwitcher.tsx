import type { Theme } from '../themes'

interface ThemeSwitcherProps {
  themes: Theme[]
  activeTheme: string
  onSelect: (id: string) => void
}

function ThemeSwitcher({ themes, activeTheme, onSelect }: ThemeSwitcherProps) {
  return (
    <nav className="theme-switcher" aria-label="Choose a theme">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          className={`theme-tab${theme.id === activeTheme ? ' active' : ''}`}
          aria-pressed={theme.id === activeTheme}
          onClick={() => onSelect(theme.id)}
        >
          {theme.label}
        </button>
      ))}
    </nav>
  )
}

export default ThemeSwitcher
