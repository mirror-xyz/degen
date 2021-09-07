import { createTheme, createThemeContract } from '@vanilla-extract/css'

import {
  borderRadius,
  borderWidth,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  opacity,
  shade,
  space,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
} from './tokens'

// Create base theme
const base = {
  borderRadius,
  borderWidth,
  color: color.base,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  opacity,
  space,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
}

export const baseVars = createThemeContract(base)
export const theme = createTheme(baseVars, base)

// Create color theme
const modeContract = {
  color: {
    ...color.light,
    accent: color.light.blue,
    accentText: color.dark.foreground,
  },
  shade: shade.light,
}

export const modeVars = createThemeContract(modeContract)
export const lightTheme = createTheme(modeVars, modeContract)
export const darkTheme = createTheme(modeVars, {
  color: {
    ...color.dark,
    accent: color.dark.blue,
    accentText: color.dark.foreground,
  },
  shade: shade.dark,
})

export const vars = {
  ...baseVars,
  theme: modeVars,
}
