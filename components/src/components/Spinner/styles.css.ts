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
        height: '24px',
        strokeWidth: '2px',
        width: '24px',
      }),
      large: atoms({
        height: '64px',
        strokeWidth: '1.5px',
        width: '64px',
      }),
    },
  },
})

export type Variants = RecipeVariants<typeof variants>
