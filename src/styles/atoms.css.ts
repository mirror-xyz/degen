import {
  ConditionalValue,
  createAtomicStyles,
  createAtomsFn,
  createNormalizeValueFn,
} from '@vanilla-extract/sprinkles'

import { vars } from './theme.css'

// --------------------------------------------------
// Responsive styles
// --------------------------------------------------
const responsiveStyles = createAtomicStyles({
  conditions: {
    sm: {},
    md: { '@media': '(min-width: 768px)' },
    lg: { '@media': '(min-width: 1024px)' },
    xl: { '@media': '(min-width: 1280px)' },
  },
  defaultCondition: 'sm',
  properties: {
    alignItems: [
      'baseline',
      'center',
      'flex-end',
      'flex-start',
      'inherit',
      'initial',
      'stretch',
    ],
    borderWidth: vars.borderWidth,
    borderBottomWidth: vars.borderWidth,
    borderLeftWidth: vars.borderWidth,
    borderRightWidth: vars.borderWidth,
    borderTopWidth: vars.borderWidth,
    borderRadius: vars.borderRadius,
    borderBottomLeftRadius: vars.borderRadius,
    borderBottomRightRadius: vars.borderRadius,
    borderTopLeftRadius: vars.borderRadius,
    borderTopRightRadius: vars.borderRadius,
    bottom: vars.space,
    display: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'none'],
    flexDirection: ['column', 'row'],
    fontSize: vars.fontSize,
    gap: vars.space,
    height: vars.space,
    inset: vars.space,
    justifyContent: [
      'center',
      'flex-end',
      'flex-start',
      'inherit',
      'initial',
      'space-around',
      'space-between',
      'space-evenly',
    ],
    left: vars.space,
    letterSpacing: vars.letterSpacing,
    lineHeight: vars.lineHeight,
    margin: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginTop: vars.space,
    maxHeight: vars.space,
    maxWidth: vars.space,
    minHeight: vars.space,
    minWidth: vars.space,
    opacity: vars.opacity,
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

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveStyles,
  Value
>

export const normalizeResponsiveValue = createNormalizeValueFn(responsiveStyles)

// --------------------------------------------------
// Selector styles
// --------------------------------------------------
const selectorStyles = createAtomicStyles({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
  },
  defaultCondition: 'base',
  properties: {
    background: vars.color,
    color: vars.color,
  },
})

export type SelectorValue<Value extends string | number> = ConditionalValue<
  typeof selectorStyles,
  Value
>

export const normalizeSelectorValue = createNormalizeValueFn(selectorStyles)

// --------------------------------------------------
// Plain styles
// --------------------------------------------------
const styles = createAtomicStyles({
  properties: {
    cursor: ['not-allowed', 'pointer'],
    fontFamily: vars.fontFamily,
    fontWeight: vars.fontWeight,
    strokeWidth: vars.borderWidth,
    transitionDuration: vars.transitionDuration,
    transitionProperty: vars.transitionProperty,
    transitionTimingFunction: vars.transitionTimingFunction,
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

// --------------------------------------------------
// Create atoms
// --------------------------------------------------
export const atoms = createAtomsFn(responsiveStyles, selectorStyles, styles)
export type Atoms = Parameters<typeof atoms>[0]
