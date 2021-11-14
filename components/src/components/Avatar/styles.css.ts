import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms } from '../../css'

export const variants = recipe({
  variants: {
    shape: {
      circle: atoms({
        borderRadius: 'full',
      }),
      square: atoms({
        borderRadius: '2xLarge',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
