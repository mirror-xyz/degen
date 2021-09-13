import { borderStyles, borderWidths, radii } from './border'
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
