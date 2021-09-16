import { recipe } from '@vanilla-extract/recipes'

import { atoms } from '~/theme'

export const variants = recipe({
  base: [
    atoms({
      backgroundColor: 'accentSecondary',
      borderRadius: 'full',
    }),
  ],
  variants: {
    size: {
      sm: atoms({
        height: 4,
      }),
      md: atoms({
        height: 8,
      }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type Variants = Parameters<typeof variants>[0]
