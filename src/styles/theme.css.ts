import { createTheme, createThemeContract } from '@vanilla-extract/css'

import {
  borderWidth,
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  opacity,
  shade,
  space,
} from './tokens'

// Create base theme
const base = {
  borderWidth,
  color: color.base,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  opacity,
  space,
}

export const baseVars = createThemeContract(base)
export const theme = createTheme(baseVars, base)

// Create color theme
const modeContract = {
  color: {
    ...color.light,
    accent: color.light.blue,
  },
  shade: shade.light,
}

export const modeVars = createThemeContract(modeContract)
export const lightTheme = createTheme(modeVars, modeContract)
export const darkTheme = createTheme(modeVars, {
  color: {
    ...color.dark,
    accent: color.dark.blue,
  },
  shade: shade.dark,
})

export const vars = {
  ...baseVars,
  theme: modeVars,
}
