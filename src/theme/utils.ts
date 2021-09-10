import { CSSVarFunction } from '@vanilla-extract/private'

import { Mode, Tokens } from '~/tokens'

export const makeTokens = (tokens: Tokens, mode: Mode = 'light') => {
  const colors = tokens.colors[mode]
  const shades = tokens.shades[mode]
  return {
    ...tokens,
    colors: tokens.colors.base,
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

const rgb = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`

type BaseVars = ReturnType<typeof makeTokens>
type ModeVars = BaseVars['mode']

export const makeColorTokens = (mode: ModeVars) => ({
  accent: rgb(mode.colors.accent),
  accentText: rgb(mode.colors.accentText),
  accentSecondary: rgb(mode.colors.accent, mode.shades.accentSecondary),
  accentSecondaryHover: rgb(
    mode.colors.accent,
    mode.shades.accentSecondaryHover,
  ),
  accentTertiary: rgb(
    mode.colors.accent,
    `calc(${mode.shades.accentSecondary} * 0.5)`,
  ),
  background: rgb(mode.colors.background),
  backgroundSecondary: rgb(mode.colors.backgroundSecondary),
  backgroundTertiary: rgb(mode.colors.backgroundTertiary),
  foreground: rgb(mode.colors.foreground),
  foregroundSecondary: rgb(
    mode.colors.foreground,
    mode.shades.foregroundSecondary,
  ),
  foregroundSecondaryHover: rgb(
    mode.colors.foreground,
    mode.shades.foregroundSecondaryHover,
  ),
  foregroundTertiary: rgb(
    mode.colors.foreground,
    `calc(${mode.shades.accentSecondary} * 0.15)`,
  ),
  groupBackground: rgb(mode.colors.groupBackground),
  groupBorder: rgb(mode.colors.groupBorder, mode.shades.groupBorder),
  text: rgb(mode.colors.foreground, mode.shades.text),
  textPrimary: rgb(mode.colors.foreground, `calc(${mode.shades.text} + 0.1)`),
  textSecondary: rgb(mode.colors.foreground, mode.shades.textSecondary),
  textTertiary: rgb(mode.colors.foreground, `calc(${mode.shades.text} * 0.66)`),
  // accents
  blue: rgb(mode.colors.blue),
  green: rgb(mode.colors.green),
  indigo: rgb(mode.colors.indigo),
  orange: rgb(mode.colors.orange),
  pink: rgb(mode.colors.pink),
  purple: rgb(mode.colors.purple),
  red: rgb(mode.colors.red),
  teal: rgb(mode.colors.teal),
  yellow: rgb(mode.colors.yellow),
})

type ColorVars = ReturnType<typeof makeColorTokens>

export const makeVars = (base: BaseVars, color: ColorVars) => ({
  ...base,
  colors: {
    ...base.colors,
    ...color,
  },
})
