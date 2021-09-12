import { borderStyles, borderWidths, radii } from './border'
import { breakpoints } from './breakpoints'
import { colors, shades } from './color'
import { space } from './space'
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
} from './typography'

export const tokens = {
  borderStyles,
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  shades,
  space,
}

export type { Accent, Mode } from './color'
export type Tokens = typeof tokens
