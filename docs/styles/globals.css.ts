import { globalFontFace, globalStyle } from '@vanilla-extract/css'

globalStyle('html', {
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
})

globalStyle('body', {
  margin: 0,
})

globalFontFace('Mono', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('https://github.com/iaolo/iA-Fonts/blob/master/iA%20Writer%20Mono/Webfonts/iAWriterMonoS-Regular.woff2?raw=true') format('woff2')",
})

globalFontFace('Mono', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '400',
  src: "url('https://github.com/iaolo/iA-Fonts/blob/master/iA%20Writer%20Mono/Webfonts/iAWriterMonoS-Italic.woff2?raw=true') format('woff2')",
})
