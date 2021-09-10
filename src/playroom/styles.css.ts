import { globalStyle } from '@vanilla-extract/css'

globalStyle('html', {
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
})

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
})
