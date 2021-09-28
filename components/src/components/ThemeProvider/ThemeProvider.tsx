import * as React from 'react'
import { setElementVars } from '@vanilla-extract/dynamic'

import { Mode, Accent as TokenAccent } from '~/tokens'
import { getAccentText, getModeColors, vars } from '~/theme'

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

const attribute = 'data-theme'
const storageKey = 'theme'
const modes = {
  light: 'light',
  dark: 'dark',
}

export type ThemeProviderProps = {
  /** Default accent name. @default blue */
  defaultAccent?: Accent
  /** Default mode name. @default light */
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
  const [state, setState] = React.useState<{
    accent: Accent
    mode: Mode
  }>({
    accent: defaultAccent,
    mode: defaultMode,
  })

  const setAccent = React.useCallback((accent: Accent) => {
    setState((x) => {
      if (!el.current) return x
      setElementVars(el.current, {
        [vars.mode.colors.accent]: getModeColors(x.mode)[accent],
        [vars.mode.colors.accentText]: getAccentText(x.mode, accent),
      })
      return { ...x, accent }
    })
  }, [])

  const setMode = React.useCallback((mode: Mode) => {
    setState((x) => ({ ...x, mode }))
    const d = document.documentElement
    d.setAttribute(attribute, mode)
  }, [])

  const value = React.useMemo(
    () => ({
      accent: state.accent,
      mode: state.mode,
      setAccent,
      setMode,
    }),
    [state.accent, state.mode, setAccent, setMode],
  )

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

  return (
    <ThemeContext.Provider value={value}>
      <ThemeScript
        {...{
          attribute,
          defaultMode,
          forcedMode,
          modes,
          storageKey,
        }}
      />
      <div ref={el}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw Error('Must be used within ThemeProvider')
  return context
}

type ThemeScriptProps = {
  attribute?: string
  defaultMode: Mode
  forcedMode?: Mode
  modes?: Record<Mode, string>
  storageKey: string
}

const ThemeScript = React.memo(
  ({
    attribute,
    defaultMode,
    forcedMode,
    modes,
    storageKey,
  }: ThemeScriptProps) => {
    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      return `var d=document.documentElement;`
    })()

    const updateDOM = (name: string, literal?: boolean) => {
      const mName = modes?.[name as Mode] || name
      const val = literal ? mName : `'${mName}'`
      return `d.setAttribute('${attribute}', ${val})`
    }

    return (
      <>
        {forcedMode ? (
          <script
            dangerouslySetInnerHTML={{
              // These are minified via Terser and then updated by hand, don't recommend
              // prettier-ignore
              __html: `!function(){${optimization}${updateDOM(forcedMode)}}()`,
            }}
            key="theme-script"
          />
        ) : (
          <script
            dangerouslySetInnerHTML={{
              // prettier-ignore
              __html: `!function(){try{${optimization}var e=localStorage.getItem("${storageKey}");if(e){${modes ? `var x=${JSON.stringify(modes)};` : ''}${updateDOM(modes ? 'x[e]' : 'e', true)}}else{${updateDOM(defaultMode)};}}catch(t){}}();`,
            }}
            key="theme-script"
          />
        )}
      </>
    )
  },
  (prevProps, nextProps) => {
    // Only re-render when forcedTheme changes
    // the rest of the props should be completely stable
    if (prevProps.forcedMode !== nextProps.forcedMode) return false
    return true
  },
)
