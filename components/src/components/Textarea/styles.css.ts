import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const variants = recipe({
  base: [
    atoms({
      backgroundColor: 'background',
      borderColor: { base: 'foregroundSecondary', focus: 'accent' },
      borderRadius: '2xLarge',
      borderWidth: '0.5',
      color: 'text',
      display: 'flex',
      fontFamily: 'sans',
      fontSize: 'base',
      fontWeight: 'medium',
      minHeight: '14',
      padding: '4',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
      width: 'full',
    }),
    style({
      resize: 'none',
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        borderColor: 'foregroundSecondary',
        cursor: 'not-allowed',
      }),
      false: {},
    },
    error: {
      true: style([
        atoms({
          borderColor: 'red',
          cursor: 'default',
        }),
        style({
          selectors: {
            '&:focus-within': {
              borderColor: vars.colors.red,
            },
          },
        }),
      ]),
    },
  },
})
