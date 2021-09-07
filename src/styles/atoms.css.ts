import { createVar, fallbackVar } from '@vanilla-extract/css'
import { createAtomicStyles, createAtomsFn } from '@vanilla-extract/sprinkles'

import { vars } from './theme.css'
import { getColor } from './utils'

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
    borderBottomWidth: vars.borderWidth,
    borderLeftWidth: vars.borderWidth,
    borderRightWidth: vars.borderWidth,
    borderTopWidth: vars.borderWidth,
    borderWidth: vars.borderWidth,
    borderRadius: vars.borderRadius,
    borderBottomLeftRadius: vars.borderRadius,
    borderBottomRightRadius: vars.borderRadius,
    borderTopLeftRadius: vars.borderRadius,
    borderTopRightRadius: vars.borderRadius,
    bottom: vars.space,
    display: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'none'],
    flexDirection: ['column', 'row'],
    fontFamily: vars.fontFamily,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
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
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    paddingTop: vars.space,
    position: ['absolute', 'fixed', 'relative'],
    right: vars.space,
    textAlign: ['center', 'left', 'right'],
    top: vars.space,
    verticalAlign: ['middle'],
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
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    mt: ['marginTop'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
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

export const colors = {
  ...vars.color,
  accent: getColor(vars.theme.color.accent),
  accentText: getColor(vars.theme.color.accentText),
  accentSecondary: getColor(
    vars.theme.color.accent,
    vars.theme.shade.accentSecondary,
  ),
  accentSecondaryHover: getColor(
    vars.theme.color.accent,
    vars.theme.shade.accentSecondaryHover,
  ),
  accentTertiary: getColor(
    vars.theme.color.accent,
    `calc(${vars.theme.shade.accentSecondary} * 0.5)`,
  ),
  background: getColor(vars.theme.color.background),
  backgroundSecondary: getColor(vars.theme.color.backgroundSecondary),
  backgroundTertiary: getColor(vars.theme.color.backgroundTertiary),
  foreground: getColor(vars.theme.color.foreground),
  foregroundSecondary: getColor(
    vars.theme.color.foreground,
    vars.theme.shade.foregroundSecondary,
  ),
  foregroundSecondaryHover: getColor(
    vars.theme.color.foreground,
    vars.theme.shade.foregroundSecondaryHover,
  ),
  foregroundTertiary: getColor(
    vars.theme.color.foreground,
    `calc(${vars.theme.shade.accentSecondary} * 0.15)`,
  ),
  groupBackground: getColor(vars.theme.color.groupBackground),
  groupBorder: getColor(
    vars.theme.color.groupBorder,
    vars.theme.shade.groupBorder,
  ),
  text: getColor(vars.theme.color.foreground, vars.theme.shade.text),
  textPrimary: getColor(
    vars.theme.color.foreground,
    `calc(${vars.theme.shade.text} + 0.1)`,
  ),
  textSecondary: getColor(
    vars.theme.color.foreground,
    vars.theme.shade.textSecondary,
  ),
  textTertiary: getColor(
    vars.theme.color.foreground,
    `calc(${vars.theme.shade.text} * 0.66)`,
  ),
  // accents
  blue: getColor(vars.theme.color.blue),
  green: getColor(vars.theme.color.green),
  indigo: getColor(vars.theme.color.indigo),
  orange: getColor(vars.theme.color.orange),
  pink: getColor(vars.theme.color.pink),
  purple: getColor(vars.theme.color.purple),
  red: getColor(vars.theme.color.red),
  teal: getColor(vars.theme.color.teal),
  yellow: getColor(vars.theme.color.yellow),
}

const boxShadowColor = createVar()

const stateStyles = createAtomicStyles({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
  },
  defaultCondition: 'default',
  properties: {
    background: colors,
    boxShadow: {
      containerMd: {
        boxShadow: `0 0 0 0.25rem ${fallbackVar(
          boxShadowColor,
          colors.foregroundSecondaryHover,
        )}`,
      },
      containerSm: {
        boxShadow: `0 0 0 0.125rem ${fallbackVar(
          boxShadowColor,
          colors.foregroundSecondaryHover,
        )}`,
      },
    },
    boxShadowColor: {
      accent: { vars: { [boxShadowColor]: colors.accent } },
      accentSecondaryHover: {
        vars: { [boxShadowColor]: colors.accentSecondaryHover },
      },
      foregroundSecondaryHover: {
        vars: { [boxShadowColor]: colors.foregroundSecondaryHover },
      },
      green: {
        vars: { [boxShadowColor]: colors.green },
      },
      red: {
        vars: { [boxShadowColor]: colors.red },
      },
    },
    color: colors,
  },
})

const styles = createAtomicStyles({
  properties: {
    cursor: ['not-allowed', 'pointer'],
    strokeWidth: vars.borderWidth,
    transitionDuration: vars.transitionDuration,
    transitionProperty: vars.transitionProperty,
    transitionTimingFunction: vars.transitionTimingFunction,
  },
})

export const atoms = createAtomsFn(responsiveStyles, stateStyles, styles)

export type Atoms = Parameters<typeof atoms>[0]
