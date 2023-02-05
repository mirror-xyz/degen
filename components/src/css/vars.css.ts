import merge from 'deepmerge'
import {
  createGlobalThemeContract,
  createGlobalTheme as createGlobalThemeWithoutPseudos,
} from '@vanilla-extract/css'
import { Contract, MapLeafNodes } from '@vanilla-extract/private'

import { Mode, tokens } from '../tokens'
import { Theme } from './types'
import { getVarName, rgb } from './utils'

/**
 * This is a wrapper around the normal createGlobalTheme that
 * adds all these global rules to pseudo element children too.
 * Some pseudo elements like ::backdrop don't inherit css variables
 */
const createGlobalTheme = <ThemeContract extends Contract>(
  selector: string,
  themeContract: ThemeContract,
  tokens: MapLeafNodes<ThemeContract, string>,
) => {
  const pseudoSelectors = ['::backdrop']
  const selectorWithPsuedos = `${selector}, ${pseudoSelectors
    .map((pseudoSelector) => {
      return `${selector} ${pseudoSelector}`
    })
    .join(',')}`

  createGlobalThemeWithoutPseudos(selectorWithPsuedos, themeContract, tokens)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const { colors, shades, ...restTokens } = tokens

const baseTokens: Omit<Theme, 'colors' | 'mode'> = restTokens
const baseVars = createGlobalThemeContract(baseTokens, getVarName)
createGlobalTheme(':root', baseVars, baseTokens)

const makeColorScheme = (mode: Mode = 'light') => {
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
      foregroundTertiary: rgb(colors.foreground, shades.foregroundTertiary),
      groupBackground: rgb(colors.groupBackground),
      groupBorder: rgb(colors.groupBorder, shades.groupBorder),
      text: rgb(colors.foreground, shades.text),
      textPrimary: rgb(colors.foreground, '1'),
      textSecondary: rgb(colors.foreground, shades.textSecondary),
      textTertiary: rgb(colors.foreground, shades.textTertiary),
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
  colors: {
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
  },
}
const accentVars = createGlobalThemeContract(accentTokens, getVarName)
createGlobalTheme('[data-theme]', accentVars, accentTokens)

type ColorVars = typeof modeVars & typeof accentVars
const colorVars = merge(accentVars, modeVars) as ColorVars

type ThemeVars = typeof baseVars & typeof colorVars
export const vars = merge(baseVars, colorVars) as ThemeVars
