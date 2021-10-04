import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { atoms } from '~/css'

const variant = {
  extraLarge: atoms({
    fontSize: 'extraLarge',
    fontWeight: 'medium',
    letterSpacing: '-0.02',
  }),
  large: atoms({
    fontSize: 'large',
    fontWeight: 'normal',
    letterSpacing: '-0.02',
  }),
  base: atoms({
    fontSize: 'base',
    fontWeight: 'normal',
    letterSpacing: '-0.015',
  }),
  small: atoms({
    fontSize: 'small',
    fontWeight: 'normal',
    letterSpacing: '-0.01',
  }),
  label: atoms({
    color: 'textSecondary',
    fontSize: 'label',
    fontWeight: 'semiBold',
    letterSpacing: '0.03',
    textTransform: 'uppercase',
  }),
}

export const variants = recipe({
  variants: {
    variant,
    ellipsis: {
      true: style([
        style({
          textOverflow: 'ellipsis',
        }),
        atoms({
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }),
      ]),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
