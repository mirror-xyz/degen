import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Mode, Accent as TokenAccent } from '~/tokens'
import { getAccentText, modes, vars } from '~/theme'
import { getModeColors } from './utils'

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

export type ThemeProviderProps = {
  /** Default accent name. Defaults to blue */
  defaultAccent?: Accent
  /** Default mode name. Defaults to light */
  defaultMode?: Mode
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean
  /** Forced mode name for the current page */
  forcedMode?: Mode
}

export const ThemeProvider = ({
  children,
  defaultAccent = 'blue',
  defaultMode = 'light',
  disableTransitionOnChange,
  forcedMode,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const el = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<{ accent: Accent; mode: Mode }>({
    accent: defaultAccent,
    mode: defaultMode,
  })

  const setAccent = React.useCallback(
    (accent: Accent, updateDOM = true) => {
      if (!el.current) return
      const enable =
        disableTransitionOnChange && updateDOM ? disableAnimation() : null
      setElementVars(el.current, {
        [vars.mode.colors.accent]: getModeColors(state.mode)[accent],
        [vars.mode.colors.accentText]: getAccentText(state.mode, accent),
      })
      setState((x) => ({ ...x, accent }))
      enable?.()
    },
    [disableTransitionOnChange, state.mode],
  )

  const setMode = React.useCallback(
    (mode: Mode, updateDOM = true) => {
      const enable =
        disableTransitionOnChange && updateDOM ? disableAnimation() : null
      setState((x) => ({ ...x, mode }))
      enable?.()
    },
    [disableTransitionOnChange],
  )

  const value = React.useMemo(
    () => ({
      accent: state.accent,
      mode: state.mode,
      setAccent,
      setMode: setMode,
    }),
    [state.accent, state.mode, setAccent, setMode],
  )

  // Set accent on load
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setAccent(defaultAccent)
  }, [defaultAccent])
  /* eslint-enable react-hooks/exhaustive-deps */

  // When mode changes, set accent
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setAccent(state.accent)
  }, [state.mode])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <ThemeContext.Provider value={value}>
      <div className={modes[forcedMode ?? state.mode]} ref={el}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw Error('Must be used within ThemeProvider')
  return context
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
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}
