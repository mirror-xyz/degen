import { createTheme, createThemeContract } from '@vanilla-extract/css'

import { tokens } from '~/tokens'

import { makeColorTokens, makeTokens, makeVars } from './utils'

const baseTokens = makeTokens(tokens)
const baseVars = createThemeContract(baseTokens)
export const modeClassNames = {
  light: createTheme(baseVars, baseTokens),
  dark: createTheme(baseVars, makeTokens(tokens, 'dark')),
}

const colorTokens = makeColorTokens(baseVars.mode)
const colorVars = createThemeContract(colorTokens)
export const colorClassName = createTheme(colorVars, colorTokens)

export const vars = makeVars(baseVars, colorVars)
