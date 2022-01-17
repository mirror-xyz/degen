import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms } from '../../css'

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
      lineHeight: '1.25',
    }),
  ]),
}

export const variants = recipe({
  variants: {
    level,
    responsive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        level: '1',
        responsive: true,
      },
      style: atoms({
        fontSize: { xs: 'headingTwo', sm: 'headingOne' },
      }),
    },
    {
      variants: {
        level: '2',
        responsive: true,
      },
      style: atoms({
        fontSize: { xs: 'extraLarge', sm: 'headingTwo' },
        letterSpacing: { xs: '-0.015', sm: '-0.02' },
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
