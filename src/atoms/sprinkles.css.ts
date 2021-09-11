import { createAtomicStyles, createAtomsFn } from '@vanilla-extract/sprinkles'

import { vars } from '~/theme'

const flexAlignment = ['flex-start', 'center', 'flex-end', 'stretch'] as const

const unresponsiveStyles = createAtomicStyles({
  properties: {
    cursor: ['not-allowed', 'pointer'],
    fontFamily: vars.fonts,
    strokeWidth: vars.borderWidths,
    whiteSpace: [
      'normal',
      'nowrap',
      'pre',
      'pre-line',
      'pre-wrap',
      'initial',
      'inherit',
    ],
    wordWrap: ['normal', 'break-word', 'initial', 'inherit'],
  },
})

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

const responsiveStyles = createAtomicStyles({
  conditions: {
    xs: {},
    sm: { '@media': `(min-width: ${breakpoints.sm}px)` },
    md: { '@media': `(min-width: ${breakpoints.md}px)` },
    lg: { '@media': `(min-width: ${breakpoints.lg}px)` },
    xl: { '@media': `(min-width: ${breakpoints.xl}px)` },
  },
  defaultCondition: 'xs',
  properties: {
    alignItems: [...flexAlignment, 'baseline'],
    alignSelf: [...flexAlignment, 'baseline'],
    borderWidth: vars.borderWidths,
    borderBottomWidth: vars.borderWidths,
    borderLeftWidth: vars.borderWidths,
    borderRightWidth: vars.borderWidths,
    borderTopWidth: vars.borderWidths,
    borderRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    bottom: vars.space,
    display: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'none'],
    flexDirection: ['column', 'row'],
    fontSize: vars.fontSizes,
    fontWeight: vars.fontWeights,
    gap: vars.space,
    height: vars.space,
    inset: vars.space,
    justifyContent: [
      ...flexAlignment,
      'space-around',
      'space-between',
      'space-evenly',
    ],
    justifySelf: flexAlignment,
    left: vars.space,
    letterSpacing: vars.letterSpacings,
    lineHeight: vars.lineHeights,
    margin: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginTop: vars.space,
    maxHeight: vars.space,
    maxWidth: vars.space,
    minHeight: vars.space,
    minWidth: vars.space,
    overflow: ['hidden'],
    padding: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    paddingTop: vars.space,
    position: ['absolute', 'fixed', 'relative'],
    right: vars.space,
    textAlign: ['center', 'left', 'right'],
    top: vars.space,
    verticalAlign: ['middle'],
    width: vars.space,
  },
  shorthands: {
    b: [
      'borderBottomWidth',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
    ],
    bb: ['borderBottomWidth'],
    bl: ['borderLeftWidth'],
    br: ['borderRightWidth'],
    bt: ['borderTopWidth'],
    bx: ['borderLeftWidth', 'borderRightWidth'],
    by: ['borderBottomWidth', 'borderTopWidth'],
    h: ['height'],
    insetX: ['left', 'right'],
    insetY: ['bottom', 'top'],
    m: ['margin'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    mt: ['marginTop'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    p: ['padding'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    pt: ['paddingTop'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    radiusLeft: ['borderBottomLeftRadius', 'borderTopLeftRadius'],
    radiusRight: ['borderBottomRightRadius', 'borderTopRightRadius'],
    radiusTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
    radiusBottom: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    w: ['width'],
  },
})

const selectorStyles = createAtomicStyles({
  conditions: {
    base: {},
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    hover: { selector: '&:hover' },
  },
  defaultCondition: 'base',
  properties: {
    backgroundColor: vars.colors,
    color: vars.colors,
  },
  shorthands: {
    bg: ['backgroundColor'],
  },
})

export const sprinkles = createAtomsFn(
  unresponsiveStyles,
  responsiveStyles,
  selectorStyles,
)
export type Sprinkles = Parameters<typeof sprinkles>[0]
