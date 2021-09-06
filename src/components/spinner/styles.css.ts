import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '~/styles/theme.css'

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
})

export const spinner = style({
  animation: `1.4s linear infinite ${rotate}`,
  stroke: vars.color.current,
})
