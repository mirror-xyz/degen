import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const variants = recipe({
  variants: {
    noBorder: {
      true: {},
      false: style({
        ':before': {
          boxShadow: `${vars.shadows['-px']} ${vars.colors.foregroundTertiary}`,
          content: '',
          inset: 0,
          position: 'absolute',
        },
      }),
    },
    shape: {
      circle: style([
        atoms({
          borderRadius: 'full',
        }),
        style({
          ':before': {
            borderRadius: vars.radii.full,
          },
        }),
      ]),
      square: style([
        atoms({
          borderRadius: '2xLarge',
        }),
        style({
          ':before': {
            borderRadius: vars.radii['2xLarge'],
          },
        }),
      ]),
    },
  },
  defaultVariants: {
    noBorder: false,
  },
})

export type Variants = RecipeVariants<typeof variants>
