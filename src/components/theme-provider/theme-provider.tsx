import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Box } from '../box'

import {
  theme as baseTheme,
  darkTheme,
  lightTheme,
  vars,
} from '~/styles/theme.css'
import { Accent, Theme, color } from '~/styles/tokens'

export type ThemeContextProps = {
  /** Active accent name */
  accent: Accent
  /** Active theme name */
  theme: Theme
  /** Update accent */
  setAccent(accent: Accent): void
  /** Update theme */
  setTheme(theme: Theme): void
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined,
)

export type ThemeProps = {
  children: React.ReactNode
  /** Default accent name. Defaults to blue */
  defaultAccent?: Accent
  /** Default theme name. Defaults to light */
  defaultTheme?: Theme
  /** Forced theme name for the current page */
  forcedTheme?: Theme
}

export const ThemeProvider = ({
  children,
  defaultAccent = 'blue',
  defaultTheme = 'light',
  forcedTheme,
}: ThemeProps) => {
  const el = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<{ accent: Accent; theme: Theme }>({
    accent: defaultAccent,
    theme: defaultTheme,
  })

  const themeClassName = React.useMemo(() => {
    let colorTheme: string
    const theme = forcedTheme ?? state.theme
    switch (theme) {
      case 'dark':
        colorTheme = darkTheme
        break
      case 'light':
      default:
        colorTheme = lightTheme
    }
    return `${baseTheme} ${colorTheme}`
  }, [state.theme, forcedTheme])

  const setAccent = React.useCallback(
    (accent: Accent) => {
      if (!el.current) return
      const accentText =
        ['foreground', 'yellow'].includes(accent) && state.theme === 'dark'
          ? color.light.foreground
          : color.dark.foreground
      setElementVars(el.current, {
        [vars.theme.color.accent]: color[state.theme][accent],
        [vars.theme.color.accentText]: accentText,
      })
      setState((x) => ({ ...x, accent }))
    },
    [state.theme],
  )

  const setTheme = React.useCallback((theme) => {
    setState((x) => ({ ...x, theme }))
  }, [])

  const value = React.useMemo(
    () => ({
      accent: state.accent,
      theme: state.theme,
      setAccent,
      setTheme,
    }),
    [state.accent, state.theme, setAccent, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <Box className={themeClassName} ref={el}>
        {children}
      </Box>
    </ThemeContext.Provider>
  )
}
