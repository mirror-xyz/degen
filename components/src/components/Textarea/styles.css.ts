import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const variants = recipe({
  base: [
    atoms({
      backgroundColor: 'background',
      borderColor: { base: 'foregroundSecondary', focus: 'accent' },
      borderRadius: 'large',
      borderWidth: '1px',
      color: 'text',
      display: 'flex',
      fontFamily: 'sans',
      fontSize: 'small',
      minHeight: '48px',
      padding: '16px',
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
