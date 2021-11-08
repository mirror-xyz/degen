import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { atoms, rgb, vars } from '../../css'

export const variants = recipe({
  base: [
    atoms({
      borderRadius: '2xLarge',
    }),
  ],
  variants: {
    dark: {
      true: atoms({
        backgroundColor: 'black',
      }),
      false: style([
        atoms({
          backgroundColor: 'white',
        }),
        style({
          boxShadow: `0px 0px ${vars.radii['2xLarge']} ${rgb('0,0,0', '0.1')}`,
        }),
      ]),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
