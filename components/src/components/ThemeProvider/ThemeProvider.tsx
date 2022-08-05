import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Mode, Accent as TokenAccent } from '../../tokens'
import { getAccentText, getModeColors, vars } from '../../css'

type Accent = TokenAccent | 'foreground'

type ThemeContextValue = {
  /** Active accent name */
  accent: Accent
  /** Forced accent name */
  forcedAccent?: Accent
  /** Forced mode name */
  forcedMode?: Mode
  /** Active mode name */
  mode: Mode
  /** Update accent */
  setAccent(accent: Accent): void
  /** Update mode */
  setMode(mode: Mode): void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export const themeModeAttribute = 'data-theme'

export type ThemeProviderProps = {
  /** Default accent name. */
  defaultAccent?: Accent
  /** Default mode name. */
  defaultMode?: Mode
  /** Element to bind theme */
  element?: string | HTMLElement
  /** Forced accent name */
  forcedAccent?: Accent
  /** Forced mode name */
  forcedMode?: Mode
}

export const ThemeProvider = ({
  children,
  defaultAccent = 'blue',
  defaultMode = 'light',
  element = ':root',
  forcedAccent,
  forcedMode,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const [accent, setAccent] = React.useState<Accent>(defaultAccent)
  const [mode, setMode] = React.useState<Mode>(defaultMode)

  const value = React.useMemo(
    () => ({
      accent: accent,
      forcedAccent,
      forcedMode,
      mode: mode,
      setAccent,
      setMode,
    }),
    [forcedAccent, forcedMode, accent, mode],
  )

  const resolvedAccent = forcedAccent ?? accent
  const resolvedMode = forcedMode ?? mode
  React.useEffect(() => {
    const root = getElement(element)
    if (root) {
      const enable = disableAnimation()
      root.setAttribute(themeModeAttribute, resolvedMode)
      setElementVars(
        root as HTMLElement,
        getThemeAccentStyles({ mode: resolvedMode, accent: resolvedAccent }),
      )
      enable()
    }
  }, [element, resolvedAccent, resolvedMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw Error('Must be used within ThemeProvider')
  return context
}

export const getThemeAccentStyles = ({
  mode,
  accent,
}: {
  mode: Mode
  accent: Accent
}) => {
  return {
    [vars.mode.colors.accent]: getModeColors(mode)[accent],
    [vars.mode.colors.accentText]: getAccentText(mode, accent),
  }
}

const getElement = (selector: string | HTMLElement = ':root') => {
  if (typeof selector === 'string') return document.querySelector(selector)
  return selector
}

const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1)
  }
}
