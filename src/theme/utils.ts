import { CSSVarFunction } from '@vanilla-extract/private'

import { Accent, Mode, tokens } from '~/tokens'

export const rgb = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`

export const getAccentText = (mode: Mode, accent: Accent | 'foreground') =>
  ['foreground', 'yellow'].includes(accent) && mode === 'dark'
    ? tokens.colors.light.foreground
    : tokens.colors.dark.foreground

export const getModeColors = (mode: Mode) => tokens.colors[mode]
