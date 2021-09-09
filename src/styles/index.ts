import { createStitches } from '@stitches/react'

export type {
  CSS,
  VariantProps,
  PropertyValue,
  ScaleValue,
} from '@stitches/react'

import {
  borderStyles,
  borderWidths,
  colors,
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
  opacities,
  radii,
  space,
  zIndices,
} from './tokens'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  prefix: 'mirror',
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  theme: {
    borderStyles,
    borderWidths,
    colors,
    fontSizes,
    fontWeights,
    fonts,
    letterSpacings,
    lineHeights,
    opacities,
    radii,
    space,
    zIndices,
  },
  themeMap: {
    opacity: 'opacities',
  },
  utils: {
    insetX: (v: number | string) => ({ left: v, right: v }),
    insetY: (v: number | string) => ({ bottom: v, top: v }),
    m: (v: number | string) => ({
      marginBottom: v,
      marginLeft: v,
      marginRight: v,
      marginTop: v,
    }),
    mb: (v: number | string) => ({ marginBottom: v }),
    ml: (v: number | string) => ({ marginLeft: v }),
    mr: (v: number | string) => ({ marginRight: v }),
    mt: (v: number | string) => ({ marginTop: v }),
    mx: (v: number | string) => ({ marginLeft: v, marginRight: v }),
    my: (v: number | string) => ({ marginBottom: v, marginTop: v }),
    p: (v: number | string) => ({
      paddingBottom: v,
      paddingLeft: v,
      paddingRight: v,
      paddingTop: v,
    }),
    pb: (v: number | string) => ({ paddingBottom: v }),
    pl: (v: number | string) => ({ paddingLeft: v }),
    pr: (v: number | string) => ({ paddingRight: v }),
    pt: (v: number | string) => ({ paddingTop: v }),
    px: (v: number | string) => ({ paddingLeft: v, paddingRight: v }),
    py: (v: number | string) => ({ paddingBottom: v, paddingTop: v }),
    radiusBottom: (v: number | string) => ({
      borderBottomLeftRadius: v,
      borderBottomRightRadius: v,
    }),
    radiusLeft: (v: number | string) => ({
      borderTopLeftRadius: v,
      borderBottomLeftRadius: v,
    }),
    radiusRight: (v: number | string) => ({
      borderBottomRightRadius: v,
      borderTopRightRadius: v,
    }),
    radiusTop: (v: number | string) => ({
      borderTopLeftRadius: v,
      borderTopRightRadius: v,
    }),
    size: (v: number | string) => ({ width: v, height: v }),
  },
})
