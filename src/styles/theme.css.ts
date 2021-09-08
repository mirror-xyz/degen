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
import { makeColor } from './utils'

// --------------------------------------------------
// Create base vars
// --------------------------------------------------
const base = {
  borderRadius,
  borderWidth,
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

// --------------------------------------------------
// Create themed vars
// --------------------------------------------------
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

// --------------------------------------------------
// Create color vars
// --------------------------------------------------
const colorContract = {
  ...color.base,
  accent: makeColor(modeVars.color.accent),
  accentText: makeColor(modeVars.color.accentText),
  accentSecondary: makeColor(
    modeVars.color.accent,
    modeVars.shade.accentSecondary,
  ),
  accentSecondaryHover: makeColor(
    modeVars.color.accent,
    modeVars.shade.accentSecondaryHover,
  ),
  accentTertiary: makeColor(
    modeVars.color.accent,
    `calc(${modeVars.shade.accentSecondary} * 0.5)`,
  ),
  background: makeColor(modeVars.color.background),
  backgroundSecondary: makeColor(modeVars.color.backgroundSecondary),
  backgroundTertiary: makeColor(modeVars.color.backgroundTertiary),
  foreground: makeColor(modeVars.color.foreground),
  foregroundSecondary: makeColor(
    modeVars.color.foreground,
    modeVars.shade.foregroundSecondary,
  ),
  foregroundSecondaryHover: makeColor(
    modeVars.color.foreground,
    modeVars.shade.foregroundSecondaryHover,
  ),
  foregroundTertiary: makeColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.accentSecondary} * 0.15)`,
  ),
  groupBackground: makeColor(modeVars.color.groupBackground),
  groupBorder: makeColor(
    modeVars.color.groupBorder,
    modeVars.shade.groupBorder,
  ),
  text: makeColor(modeVars.color.foreground, modeVars.shade.text),
  textPrimary: makeColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.text} + 0.1)`,
  ),
  textSecondary: makeColor(
    modeVars.color.foreground,
    modeVars.shade.textSecondary,
  ),
  textTertiary: makeColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.text} * 0.66)`,
  ),
  // accents
  blue: makeColor(modeVars.color.blue),
  green: makeColor(modeVars.color.green),
  indigo: makeColor(modeVars.color.indigo),
  orange: makeColor(modeVars.color.orange),
  pink: makeColor(modeVars.color.pink),
  purple: makeColor(modeVars.color.purple),
  red: makeColor(modeVars.color.red),
  teal: makeColor(modeVars.color.teal),
  yellow: makeColor(modeVars.color.yellow),
}
export const colorVars = createThemeContract(colorContract)
export const colorTheme = createTheme(colorVars, colorContract)

// --------------------------------------------------
// Export CSS vars
// --------------------------------------------------
export const vars = {
  ...baseVars,
  color: colorVars,
  theme: modeVars,
}
