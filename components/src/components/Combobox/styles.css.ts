import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const combobox = recipe({
  base: [
    atoms({
      backgroundColor: 'background',
      borderWidth: '0.5',
      borderColor: 'foregroundSecondary',
      borderRadius: '2xLarge',
      color: 'text',
      display: 'flex',
      height: '14',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
    }),
  ],
  variants: {
    active: {
      true: atoms({
        borderBottomRadius: 'none',
      }),
    },
  },
})

export const textbox = recipe({
  base: atoms({
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'inherit',
    display: 'flex',
    fontFamily: 'sans',
    fontSize: 'base',
    fontWeight: 'medium',
    height: 'full',
    lineHeight: 'none',
    paddingX: '4',
    position: 'relative',
    width: 'full',
  }),
  variants: {
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
    },
    suffix: {
      true: atoms({
        paddingRight: 'none',
      }),
    },
  },
})

export const listbox = style([
  style({
    borderTop: vars.borderWidths['0'],
    maxHeight: calc.multiply(vars.space['14'], 3.5),
    overscrollBehavior: 'contain',
    overflowY: 'auto',
  }),
  atoms({
    backgroundColor: 'background',
    borderBottomRadius: '2xLarge',
    borderWidth: '0.5',
    borderColor: 'foregroundSecondary',
    position: 'absolute',
    width: 'full',
  }),
])
