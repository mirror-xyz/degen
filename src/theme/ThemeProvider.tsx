import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'
import clsx from 'clsx'

import { Accent, Mode, tokens } from '~/tokens'
import { colorClassName, modeClassNames, vars } from './vars.css'

type ThemeContextProps = {
  /** Active accent name */
  accent: Accent
  /** Active mode name */
  mode: Mode
  /** Update accent */
  setAccent(accent: Accent): void
  /** Update mode */
  setMode(mode: Mode): void
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined,
)

export type ThemeProps = {
  children: React.ReactNode
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
}: ThemeProps) => {
  const el = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<{ accent: Accent; mode: Mode }>({
    accent: defaultAccent,
    mode: defaultMode,
  })

  const setAccent = React.useCallback(
    (accent: Accent) => {
      if (!el.current) return
      const accentText =
        ['foreground', 'yellow'].includes(accent) && state.mode === 'dark'
          ? tokens.colors.light.foreground
          : tokens.colors.dark.foreground
      const mode = tokens.colors[state.mode]
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

  const className = React.useMemo(() => {
    const mode = forcedMode ?? state.mode
    return clsx(modeClassNames[mode], colorClassName)
  }, [state.mode, forcedMode])

  // Set accent on load if default is provided
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (defaultMode === undefined || defaultAccent === 'blue') return
    setAccent(defaultAccent)
  }, [defaultAccent])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <ThemeContext.Provider value={value}>
      <div className={className} ref={el}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
