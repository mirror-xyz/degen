import { CSSVarFunction } from '@vanilla-extract/private'

import { Mode, Tokens } from '~/tokens'

const rgb = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`

export const makeTokens = (tokens: Tokens, mode: Mode = 'light') => {
  const colors = tokens.colors[mode]
  const shades = tokens.shades[mode]
  return {
    ...tokens,
    colors: {
      ...tokens.colors.base,
      background: rgb(colors.background),
      backgroundSecondary: rgb(colors.backgroundSecondary),
      backgroundTertiary: rgb(colors.backgroundTertiary),
      foreground: rgb(colors.foreground),
      foregroundSecondary: rgb(colors.foreground, shades.foregroundSecondary),
      foregroundSecondaryHover: rgb(
        colors.foreground,
        shades.foregroundSecondaryHover,
      ),
      foregroundTertiary: rgb(
        colors.foreground,
        `calc(${shades.accentSecondary} * 0.15)`,
      ),
      groupBackground: rgb(colors.groupBackground),
      groupBorder: rgb(colors.groupBorder, shades.groupBorder),
      text: rgb(colors.foreground, shades.text),
      textPrimary: rgb(colors.foreground, `calc(${shades.text} + 0.1)`),
      textSecondary: rgb(colors.foreground, shades.textSecondary),
      textTertiary: rgb(colors.foreground, `calc(${shades.text} * 0.66)`),
      blue: rgb(colors.blue),
      green: rgb(colors.green),
      indigo: rgb(colors.indigo),
      orange: rgb(colors.orange),
      pink: rgb(colors.pink),
      purple: rgb(colors.purple),
      red: rgb(colors.red),
      teal: rgb(colors.teal),
      yellow: rgb(colors.yellow),
    },
    mode: {
      colors: {
        ...colors,
        accent: colors.blue,
        accentText: colors.foreground,
      },
      shades,
    },
  }
}

type BaseVars = ReturnType<typeof makeTokens>
type ModeVars = BaseVars['mode']

export const makeAccentTokens = ({ colors, shades }: ModeVars) => ({
  accent: rgb(colors.accent),
  accentText: rgb(colors.accentText),
  accentSecondary: rgb(colors.accent, shades.accentSecondary),
  accentSecondaryHover: rgb(colors.accent, shades.accentSecondaryHover),
  accentTertiary: rgb(colors.accent, `calc(${shades.accentSecondary} * 0.5)`),
})
