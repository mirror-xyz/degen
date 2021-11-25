import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const wrapper = recipe({
  base: style([
    atoms({
      margin: 'auto',
      marginBottom: { xs: '0', sm: 'auto' },
      position: 'relative',
      width: 'full',
    }),
  ]),
  variants: {
    variant: {
      small: style([
        atoms({
          maxWidth: { sm: '112' },
        }),
      ]),
      large: style([
        atoms({
          maxWidth: { sm: '168' },
        }),
      ]),
    },
  },
})

export const content = style([
  atoms({
    backgroundColor: 'background',
    radiusBottom: { sm: '3xLarge' },
    radiusTop: '3xLarge',
    height: 'max',
    position: 'relative',
    width: 'full',
  }),
])

export const overlay = style([
  atoms({
    inset: '0',
    position: 'absolute',
  }),
  style({
    background: `linear-gradient(to right, rgba(${vars.mode.colors.background}, 0.5), rgba(${vars.mode.colors.background}, 0.5)),linear-gradient( to right, rgba(${vars.mode.colors.foreground}, 0.1), rgba(${vars.mode.colors.foreground}, 0.1))`,
    backdropFilter: 'blur(5px)',
  }),
])
