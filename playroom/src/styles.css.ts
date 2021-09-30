import { globalStyle } from '@vanilla-extract/css'

import { vars } from '~/theme'

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('html', {
  fontSize: '16px',
  background: vars.colors.background,
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})
