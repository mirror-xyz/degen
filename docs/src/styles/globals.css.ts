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
  fontSize: '16px',
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

// Make scroll bars more chill
globalStyle('body', {
  scrollbarColor: `${vars.colors.foregroundSecondary} transparent;`,
})

globalStyle('::-webkit-scrollbar', {
  backgroundColor: vars.colors.transparent,
  height: vars.space['0'],
  width: vars.space['2.5'],
})

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: vars.colors.transparent,
  padding: vars.space['0.5'],
})

globalStyle('::-webkit-scrollbar-thumb', {
  borderRadius: vars.radii.extraLarge,
  backgroundColor: vars.colors.foreground,
})

globalStyle('::-webkit-scrollbar-thumb', {
  borderRadius: vars.radii.extraLarge,
  backgroundColor: vars.colors.foregroundSecondary,
})

globalStyle('::-webkit-scrollbar-thumb:hover', {
  backgroundColor: vars.colors.textTertiary,
})
