import { StyleRule, createThemeContract, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars as globalVars } from '../../css'

// https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/

export const vars = createThemeContract({
  trackWidth: null,
  trackHeight: null,
  trackColor: null,
  thumbColor: null,
  thumbSize: null,
})

const track: StyleRule = {
  width: vars.trackWidth,
  height: vars.trackHeight,
  background: vars.trackColor,
  borderRadius: globalVars.radii.full,
}

const thumb: StyleRule = {
  borderRadius: globalVars.radii.full,
  height: vars.thumbSize,
  width: vars.thumbSize,
  background: vars.thumbColor,
  cursor: 'pointer',
}

export const range = style({
  WebkitAppearance: 'none',
  appearance: 'none',
  height: vars.thumbSize,
  width: vars.trackWidth,
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
