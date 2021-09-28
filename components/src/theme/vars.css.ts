import merge from 'deepmerge'
import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css'

import { Mode, tokens } from '~/tokens'
import { Theme } from './types'
import { getVarName, rgb } from './utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
const { colors, shades, ...restTokens } = tokens
/* eslint-enable @typescript-eslint/no-unused-vars */

const baseTokens: Omit<Theme, 'colors' | 'mode'> = restTokens
const baseVars = createGlobalThemeContract(baseTokens, getVarName)
createGlobalTheme(':root', baseVars, baseTokens)

const makeColorScheme = (
  mode: Mode = 'light',
): { colors: Theme['colors']; mode: Theme['mode'] } => {
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

const modeTokens = makeColorScheme('light')
const modeVars = createGlobalThemeContract(modeTokens, getVarName)
createGlobalTheme('[data-theme="light"]', modeVars, modeTokens)
createGlobalTheme('[data-theme="dark"]', modeVars, makeColorScheme('dark'))

const mode = modeVars.mode
const accentTokens = {
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
}
const accentVars = createGlobalThemeContract(accentTokens, getVarName)
createGlobalTheme(':root', accentVars, accentTokens)

const colorVars = merge(modeVars, {
  colors: accentVars,
})

export const vars = merge(baseVars, colorVars)
