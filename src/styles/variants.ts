import { styleVariants } from '@vanilla-extract/css'

import { atoms } from './atoms.css'

export const backgroundVariants = styleVariants({
  page: {
    background: atoms({ background: 'background' }),
  },
  secondary: {
    background: atoms({ background: 'foregroundSecondary' }),
  },
  tertiary: {
    background: atoms({ background: 'foregroundTertiary' }),
  },
})

export type Background = keyof typeof backgroundVariants
