import {
  StyleRule,
  assignVars,
  createThemeContract,
  style,
} from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars as globalVars } from '../../css'

/**
 * Tested on Chrome, Safari, Firefox
 * All input styling techniques derived from:
 * https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
 */

const vars = createThemeContract({
  trackHeight: null,
  thumbSize: null,
})

const track: StyleRule = {
  width: globalVars.space.full,
  height: vars.trackHeight,
  background: globalVars.colors.foregroundSecondary,
  borderRadius: globalVars.radii.full,
}

const thumb: StyleRule = {
  borderRadius: globalVars.radii.full,
  height: vars.thumbSize,
  width: vars.thumbSize,
  background: globalVars.colors.accent,
  cursor: 'pointer',
}

export const range = style({
  vars: assignVars(vars, {
    trackHeight: globalVars.space['0.5'],
    thumbSize: globalVars.space[6],
  }),

  WebkitAppearance: 'none',
  appearance: 'none',
  height: vars.thumbSize,
  background: 'none',

  // Track styles

  '::-webkit-slider-runnable-track': {
    ...track,
  },

  '::-moz-range-track': {
    ...track,
  },

  // Thumb styles and browser-specific overrides

  '::-webkit-slider-thumb': {
    ...thumb,
    WebkitAppearance: 'none',
    marginTop: calc(vars.trackHeight)
      .subtract(vars.thumbSize)
      .divide(2)
      .toString(), // Centers thumb on webkit
    boxShadow: 'none', // iOS
  },

  '::-moz-range-thumb': {
    ...thumb,
    borderWidth: 0,
  },
})
