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
import { getColor } from './utils'

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
  accent: getColor(modeVars.color.accent),
  accentText: getColor(modeVars.color.accentText),
  accentSecondary: getColor(
    modeVars.color.accent,
    modeVars.shade.accentSecondary,
  ),
  accentSecondaryHover: getColor(
    modeVars.color.accent,
    modeVars.shade.accentSecondaryHover,
  ),
  accentTertiary: getColor(
    modeVars.color.accent,
    `calc(${modeVars.shade.accentSecondary} * 0.5)`,
  ),
  background: getColor(modeVars.color.background),
  backgroundSecondary: getColor(modeVars.color.backgroundSecondary),
  backgroundTertiary: getColor(modeVars.color.backgroundTertiary),
  foreground: getColor(modeVars.color.foreground),
  foregroundSecondary: getColor(
    modeVars.color.foreground,
    modeVars.shade.foregroundSecondary,
  ),
  foregroundSecondaryHover: getColor(
    modeVars.color.foreground,
    modeVars.shade.foregroundSecondaryHover,
  ),
  foregroundTertiary: getColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.accentSecondary} * 0.15)`,
  ),
  groupBackground: getColor(modeVars.color.groupBackground),
  groupBorder: getColor(modeVars.color.groupBorder, modeVars.shade.groupBorder),
  text: getColor(modeVars.color.foreground, modeVars.shade.text),
  textPrimary: getColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.text} + 0.1)`,
  ),
  textSecondary: getColor(
    modeVars.color.foreground,
    modeVars.shade.textSecondary,
  ),
  textTertiary: getColor(
    modeVars.color.foreground,
    `calc(${modeVars.shade.text} * 0.66)`,
  ),
  // accents
  blue: getColor(modeVars.color.blue),
  green: getColor(modeVars.color.green),
  indigo: getColor(modeVars.color.indigo),
  orange: getColor(modeVars.color.orange),
  pink: getColor(modeVars.color.pink),
  purple: getColor(modeVars.color.purple),
  red: getColor(modeVars.color.red),
  teal: getColor(modeVars.color.teal),
  yellow: getColor(modeVars.color.yellow),
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
