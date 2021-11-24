import { style } from '@vanilla-extract/css'

import { atoms } from '../../css'

export const content = style([
  atoms({
    backgroundColor: 'background',
    borderRadius: '3xLarge',
    position: 'relative',
  }),
])
