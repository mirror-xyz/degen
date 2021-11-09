import { style } from '@vanilla-extract/css'

import { vars } from '../../css'

export const wrapper = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
  transform: `translateX(0px)`,
})
