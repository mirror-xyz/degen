import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { keyframes, style } from '@vanilla-extract/css'

import { atoms, vars } from '~/css'

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

export const variants = recipe({
  base: [
    style({
      animation: `1.4s linear infinite ${rotate}`,
      stroke: vars.colors.current,
    }),
  ],
  variants: {
    size: {
      small: atoms({
        size: '6',
        strokeWidth: '0.5',
      }),
      large: atoms({
        size: '16',
        strokeWidth: '0.375',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
