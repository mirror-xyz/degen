import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from 'degen/css'

globalFontFace('iAWriter Mono', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/mono/iAWriterMonoS-Regular.woff2') format('woff2')",
})

globalFontFace('iAWriter Mono', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '400',
  src: "url('/fonts/mono/iAWriterMonoS-Italic.woff2') format('woff2')",
})

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})

globalStyle('html', {
  fontSize: vars.fontSizes.root,
  background: vars.colors.background,
  color: vars.colors.foreground,
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})

globalStyle('a', {
  textDecoration: 'none',
})
