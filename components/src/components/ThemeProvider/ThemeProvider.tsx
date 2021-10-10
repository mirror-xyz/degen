import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Mode, Accent as TokenAccent } from '~/tokens'
import { getAccentText, getModeColors, vars } from '~/css'

type Accent = TokenAccent | 'foreground'

type ThemeContextValue = {
  /** Active accent name */
  accent: Accent
  /** Active mode name */
  mode: Mode
  /** Update accent */
  setAccent(accent: Accent): void
  /** Update mode */
  setMode(mode: Mode): void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export const attribute = 'data-theme'

export type ThemeProviderProps = {
  /** Default accent name. @default blue */
  defaultAccent?: Accent
  /** Default mode name. @default light */
  defaultMode?: Mode
  /** Element to bind theme */
  element?: string | HTMLElement
  /** Forced mode name for the current page */
  forcedMode?: Mode
}

export const ThemeProvider = ({
  children,
  defaultAccent = 'blue',
  defaultMode = 'light',
  element = ':root',
  forcedMode,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const [state, setState] = React.useState<{
    accent: Accent
    mode: Mode
  }>({
    accent: defaultAccent,
    mode: defaultMode,
  })

  const setAccent = React.useCallback(
    (accent: Accent) => {
      setState((x) => {
        const root = getElement(element)
        if (root) {
          const enable = disableAnimation()
          setElementVars(root as HTMLElement, {
            [vars.mode.colors.accent]: getModeColors(x.mode)[accent],
            [vars.mode.colors.accentText]: getAccentText(x.mode, accent),
          })
          enable()
        }
        return { ...x, accent }
      })
    },
    [element],
  )

  const setMode = React.useCallback(
    (mode: Mode) => {
      setState((x) => ({ ...x, mode }))
      const enable = disableAnimation()
      const root = getElement(element)
      root?.setAttribute(attribute, mode)
      enable()
    },
    [element],
  )

  const value = React.useMemo(
    () => ({
      accent: state.accent,
      mode: state.mode,
      setAccent,
      setMode,
    }),
    [state.accent, state.mode, setAccent, setMode],
  )

  // Set mode on load
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const root = getElement(element)
    const mode = forcedMode ?? defaultMode
    root?.setAttribute(attribute, mode)
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  // Set accent on load
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setAccent(defaultAccent)
  }, [defaultAccent])
  /* eslint-enable react-hooks/exhaustive-deps */

  // When mode changes, update accent
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setAccent(state.accent)
  }, [state.mode])
  /* eslint-enable react-hooks/exhaustive-deps */

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw Error('Must be used within ThemeProvider')
  return context
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
