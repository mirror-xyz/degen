import { globalStyle, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { responsiveStyle, vars } from '../../css'
import * as inputStyles from '../Input/styles.css'

export const combobox = style({})
export const comboboxActive = style({})

globalStyle(`${combobox} ${inputStyles.inputParent}:focus-within`, {
  borderColor: vars.colors.foregroundSecondary,
})
globalStyle(`${comboboxActive} ${inputStyles.inputParent}`, {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
})

export const listbox = style([
  style({
    overscrollBehavior: 'contain',
  }),
  responsiveStyle({
    md: {
      borderBottomLeftRadius: vars.radii['2xLarge'],
      borderBottomRightRadius: vars.radii['2xLarge'],
      borderWidth: vars.borderWidths['0.5'],
      borderColor: vars.colors.foregroundSecondary,
      borderTop: vars.borderWidths['0'],
      maxHeight: calc.multiply(vars.space['14'], 3.5),
      overflowY: 'auto',
    },
  }),
])
