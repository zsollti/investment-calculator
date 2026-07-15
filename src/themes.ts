export interface Theme {
  id: string
  label: string
}

export const THEMES: Theme[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'mono', label: 'Mono' },
  { id: 'terminal', label: 'Terminal' },
]

export const DEFAULT_THEME = 'classic'
export const THEME_STORAGE_KEY = 'investment-calculator-theme'
