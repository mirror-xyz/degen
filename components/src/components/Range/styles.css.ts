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

const publicVars = createThemeContract({
  trackWidth: null,
})

const privateVars = createThemeContract({
  trackHeight: null,
  trackColor: null,
  thumbColor: null,
  thumbSize: null,
})

const track: StyleRule = {
  width: publicVars.trackWidth,
  height: privateVars.trackHeight,
  background: privateVars.trackColor,
  borderRadius: globalVars.radii.full,
}

const thumb: StyleRule = {
  borderRadius: globalVars.radii.full,
  height: privateVars.thumbSize,
  width: privateVars.thumbSize,
  background: privateVars.thumbColor,
  cursor: 'pointer',
}

export const range = style({
  vars: assignVars(privateVars, {
    trackHeight: globalVars.space['0.5'],
    trackColor: globalVars.colors.foregroundSecondary,
    thumbColor: globalVars.colors.accent,
    thumbSize: globalVars.space[6],
  }),

  WebkitAppearance: 'none',
  appearance: 'none',
  height: privateVars.thumbSize,
  width: publicVars.trackWidth,
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
    marginTop: calc(privateVars.trackHeight)
      .subtract(privateVars.thumbSize)
      .divide(2)
      .toString(), // Centers thumb on webkit
    boxShadow: 'none', // iOS
  },

  '::-moz-range-thumb': {
    ...thumb,
    borderWidth: 0,
  },
})

export { publicVars as vars }
