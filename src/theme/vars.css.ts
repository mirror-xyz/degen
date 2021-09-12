import merge from 'deepmerge'
import { createTheme, createThemeContract } from '@vanilla-extract/css'
import clsx from 'clsx'

import { Accent, Mode, Tokens, tokens } from '~/tokens'
import { rgb } from './utils'

type ThemeColors = Tokens['colors']['base'] & { [key in Accent]: string } & {
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
  foreground: string
  foregroundSecondary: string
  foregroundSecondaryHover: string
  foregroundTertiary: string
  groupBackground: string
  groupBorder: string
  text: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
}

type ThemeMode = {
  colors: Tokens['colors']['light'] & {
    accent: string
    accentText: string
    accentSecondary?: string
    accentSecondaryHover?: string
    accentTertiary?: string
  }
  shades: Tokens['shades']['light']
}

export type Theme = {
  borderStyles: Tokens['borderStyles']
  borderWidths: Tokens['borderWidths']
  breakpoints: Tokens['breakpoints']
  colors: ThemeColors
  fonts: Tokens['fonts']
  fontSizes: Tokens['fontSizes']
  fontWeights: Tokens['fontWeights']
  letterSpacings: Tokens['letterSpacings']
  lineHeights: Tokens['lineHeights']
  mode: ThemeMode
  radii: Tokens['radii']
  space: Tokens['space']
}

const makeColorScheme = (
  mode: Mode = 'light',
): { colors: ThemeColors; mode: ThemeMode } => {
  const colors = tokens.colors[mode]
  const shades = tokens.shades[mode]
  return {
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

/* eslint-disable @typescript-eslint/no-unused-vars */
const { colors, shades, ...baseTokens } = tokens
/* eslint-enable @typescript-eslint/no-unused-vars */
const defaultTokens: Theme = merge(baseTokens, makeColorScheme('light'))
const defaultVars = createThemeContract(defaultTokens)
const lightTheme = createTheme(defaultVars, defaultTokens)
const darkTheme = createTheme(
  defaultVars,
  merge(baseTokens, makeColorScheme('dark')),
)

const accentTokens = {
  accent: rgb(defaultVars.mode.colors.accent),
  accentText: rgb(defaultVars.mode.colors.accentText),
  accentSecondary: rgb(
    defaultVars.mode.colors.accent,
    defaultVars.mode.shades.accentSecondary,
  ),
  accentSecondaryHover: rgb(
    defaultVars.mode.colors.accent,
    defaultVars.mode.shades.accentSecondaryHover,
  ),
  accentTertiary: rgb(
    defaultVars.mode.colors.accent,
    `calc(${defaultVars.mode.shades.accentSecondary} * 0.5)`,
  ),
}
const accentVars = createThemeContract(accentTokens)
const accentTheme = createTheme(accentVars, accentTokens)

export const modes = {
  light: clsx(lightTheme, accentTheme),
  dark: clsx(darkTheme, accentTheme),
}

export const vars = merge(defaultVars, {
  colors: accentVars,
})
