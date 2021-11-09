import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { keyframes, style } from '@vanilla-extract/css'

import { atoms, motionSafe, vars } from '../../css'

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

export const variants = recipe({
  base: [
    style({
      stroke: vars.colors.current,
      ...motionSafe({
        animation: `1.4s linear infinite ${rotate}`,
      }),
    }),
  ],
  variants: {
    size: {
      small: atoms({
        height: '6',
        strokeWidth: '0.5',
        width: '6',
      }),
      large: atoms({
        height: '16',
        strokeWidth: '0.375',
        width: '16',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
