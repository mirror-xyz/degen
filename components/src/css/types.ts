import { Accent, Tokens } from '~/tokens'

type ThemeColors = Tokens['colors']['base'] & { [key in Accent]: string } & {
  background: string
  backgroundSecondary: string
  backgroundTertiary: string
  foreground: string
  foregroundSecondary: string
  foregroundSecondaryHover: string
  foregroundTertiary: string
  groupBackground: string
  groupBorder: string
  text: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
}

type ThemeMode = {
  colors: Tokens['colors']['light'] & {
    accent: string
    accentText: string
    accentSecondary?: string
    accentSecondaryHover?: string
    accentTertiary?: string
  }
  shades: Tokens['shades']['light']
}

export type Theme = {
  borderStyles: Tokens['borderStyles']
  borderWidths: Tokens['borderWidths']
  colors: ThemeColors
  fonts: Tokens['fonts']
  fontSizes: Tokens['fontSizes']
  fontWeights: Tokens['fontWeights']
  letterSpacings: Tokens['letterSpacings']
  lineHeights: Tokens['lineHeights']
  opacity: Tokens['opacity']
  mode: ThemeMode
  radii: Tokens['radii']
  shadows: Tokens['shadows']
  space: Tokens['space']
}
