import { createTheme, createThemeContract } from '@vanilla-extract/css'

import { tokens } from '~/tokens'
import { makeAccentTokens, makeTokens } from './utils'

const baseTokens = makeTokens(tokens)
const baseVars = createThemeContract(baseTokens)

const accentTokens = makeAccentTokens(baseVars.mode)
const accentVars = createThemeContract(accentTokens)
const accent = createTheme(accentVars, accentTokens)

export const modes = {
  light: `${createTheme(baseVars, baseTokens)} ${accent}`,
  dark: `${createTheme(baseVars, makeTokens(tokens, 'dark'))} ${accent}`,
}

export const vars = {
  ...baseVars,
  colors: {
    ...baseVars.colors,
    ...accentVars,
  },
}
