import { recipe } from '@vanilla-extract/recipes'
import { keyframes, style } from '@vanilla-extract/css'

import { atoms, vars } from '~/theme'

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
      md: atoms({
        height: 6,
        width: 6,
        strokeWidth: 2,
      }),
      lg: atoms({
        color: 'textSecondary',
        height: 16,
        width: 16,
        strokeWidth: 1.5,
      }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type Variants = Parameters<typeof variants>[0]
