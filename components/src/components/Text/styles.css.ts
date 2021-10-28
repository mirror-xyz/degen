import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms } from '../../css'

const variant = {
  extraLarge: style([
    atoms({
      fontSize: 'extraLarge',
      fontWeight: 'medium',
      letterSpacing: '-0.02',
    }),
    style({
      lineHeight: '2rem',
    }),
  ]),
  large: style([
    atoms({
      fontSize: 'large',
      fontWeight: 'normal',
      letterSpacing: '-0.02',
    }),
    style({
      lineHeight: '2rem',
    }),
  ]),
  base: atoms({
    fontSize: 'base',
    fontWeight: 'normal',
    letterSpacing: '-0.015',
    lineHeight: '1.5',
  }),
  small: style([
    atoms({
      fontSize: 'small',
      fontWeight: 'normal',
      letterSpacing: '-0.01',
    }),
    style({
      lineHeight: '1.5rem',
    }),
  ]),
  label: atoms({
    color: 'textTertiary',
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
