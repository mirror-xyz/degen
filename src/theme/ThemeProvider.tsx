import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Accent, Mode } from '~/tokens'
import { getAccentText, modes, vars } from '~/theme'
import { getModeColors } from './utils'

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

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
)

export type ThemeProviderProps = {
  /** Default accent name. Defaults to blue */
  defaultAccent?: Accent
  /** Default mode name. Defaults to light */
  defaultMode?: Mode
  /** Forced mode name for the current page */
  forcedMode?: Mode
}

export const ThemeProvider = ({
  children,
  defaultAccent = 'blue',
  defaultMode = 'light',
  forcedMode,
}: React.PropsWithChildren<ThemeProviderProps>) => {
  const el = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<{ accent: Accent; mode: Mode }>({
    accent: defaultAccent,
    mode: defaultMode,
  })

  const setAccent = React.useCallback(
    (accent: Accent) => {
      if (!el.current) return
      const mode = getModeColors(state.mode)
      const accentText = getAccentText(state.mode, accent)
      setElementVars(el.current, {
        [vars.mode.colors.accent]: mode[accent],
        [vars.mode.colors.accentText]: accentText,
      })
      setState((x) => ({ ...x, accent }))
    },
    [state.mode],
  )

  const setMode = React.useCallback((mode) => {
    setState((x) => ({ ...x, mode }))
  }, [])

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
  if (context === undefined)
    throw Error('useTheme must be used within ThemeProvider')
  return context
}
