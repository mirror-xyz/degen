import { globalStyle } from '@vanilla-extract/css'

import { vars } from 'degen/css'

globalStyle('.npm__react-simple-code-editor__textarea', {
  fontFamily: vars.fonts.mono + ' !important',
  fontSize: vars.fontSizes.base + ' !important',
  padding: vars.space['24px'] + ' !important',
  paddingRight: vars.space['56px'] + ' !important',
})

globalStyle('.npm__react-simple-code-editor__textarea:focus-visible', {
  outline: 'none',
})

globalStyle('.npm__react-simple-code-editor__textarea + pre', {
  fontFamily: vars.fonts.mono + ' !important',
  fontSize: vars.fontSizes.base + ' !important',
  padding: vars.space['24px'] + ' !important',
  paddingRight: vars.space['56px'] + ' !important',
})
