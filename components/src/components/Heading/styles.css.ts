import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms } from '~/theme'

const level = {
  '1': atoms({
    fontSize: 'headingOne',
    fontWeight: 'semiBold',
    letterSpacing: '-0.02',
  }),
  '2': atoms({
    fontSize: 'headingTwo',
    fontWeight: 'semiBold',
    letterSpacing: '-0.02',
  }),
}

export const variants = recipe({
  variants: {
    level,
  },
})

export type Variants = RecipeVariants<typeof variants>
