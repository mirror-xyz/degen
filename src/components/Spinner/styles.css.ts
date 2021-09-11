import { recipe } from '@vanilla-extract/recipes'
import { keyframes, style } from '@vanilla-extract/css'

import { atoms } from '~/atoms'
import { vars } from '~/theme'

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

const size = {
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
}

export type Size = keyof typeof size

export const root = recipe({
  base: [
    style({
      animation: `1.4s linear infinite ${rotate}`,
      stroke: vars.colors.current,
    }),
  ],
  variants: {
    size,
  },
  defaultVariants: {
    size: 'md',
  },
})
