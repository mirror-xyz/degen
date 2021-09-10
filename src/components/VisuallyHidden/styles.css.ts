import { style } from '@vanilla-extract/css'

import { atoms } from '~/theme'

export const visuallyHidden = style([
  {
    clip: 'rect(0, 0, 0, 0)',
  },
  atoms({
    borderWidth: 0,
    height: 'px',
    margin: '-px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 'px',
  }),
])
