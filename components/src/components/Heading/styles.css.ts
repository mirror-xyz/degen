import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms } from '~/css'

const level = {
  '1': style([
    atoms({
      fontSize: 'headingOne',
      fontWeight: 'semiBold',
      letterSpacing: '-0.02',
    }),
    style({
      lineHeight: '4rem',
    }),
  ]),
  '2': style([
    atoms({
      fontSize: 'headingTwo',
      fontWeight: 'semiBold',
      letterSpacing: '-0.02',
    }),
    style({
      lineHeight: '2.5rem',
    }),
  ]),
}

export const variants = recipe({
  variants: {
    level,
  },
})

export type Variants = RecipeVariants<typeof variants>
