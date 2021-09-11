import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { atoms } from '~/atoms'

const variant = {
  description: atoms({
    color: 'textTertiary',
    fontFamily: 'sans',
    fontSize: { sm: 'lg', md: 'xl' },
    fontWeight: 550,
    letterSpacing: { sm: 'normal', md: 'snug' },
    wordWrap: 'break-word',
  }),
  title: atoms({
    color: 'text',
    fontFamily: 'sans',
    fontSize: { sm: '3xl', md: '4xl', lg: '5xl' },
    fontWeight: 'semibold',
    letterSpacing: { sm: 'snug', md: 'tight' },
    lineHeight: { sm: 'snug', md: 'tight' },
  }),
}

export type Variant = keyof typeof variant

export const root = recipe({
  base: [
    atoms({
      color: 'text',
      fontFamily: 'sans',
    }),
  ],
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
