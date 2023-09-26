import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const inputParent = style({})

export const root = recipe({
  base: [
    atoms({
      backgroundColor: 'background',
      borderWidth: '1px',
      borderColor: 'foregroundSecondary',
      borderRadius: 'large',
      color: 'text',
      display: 'flex',
      fontSize: 'small',
      height: '48px',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
    }),
    style({
      selectors: {
        '&:focus-within': {
          borderColor: vars.colors.accent,
        },
      },
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        borderColor: 'foregroundSecondary',
      }),
      false: {},
    },
    error: {
      true: style([
        atoms({
          borderColor: 'red',
          cursor: 'default',
        }),
        style({
          selectors: {
            '&:focus-within': {
              borderColor: vars.colors.red,
            },
          },
        }),
      ]),
    },
  },
})

const container = atoms({
  alignItems: 'center',
  display: 'flex',
  height: 'full',
  lineHeight: 'none',
})

const text = atoms({
  color: 'inherit',
  fontFamily: 'sans',
  fontSize: 'small',
})

const affix = style([container, text, style({ lineHeight: 'normal' })])
export const prefix = style([
  affix,
  atoms({ paddingLeft: '16px', paddingRight: '8px' }),
])
export const suffix = style([
  affix,
  atoms({ paddingRight: '16px', paddingLeft: '8px' }),
])

export const input = recipe({
  base: [
    atoms({
      backgroundColor: 'transparent',
      position: 'relative',
      width: 'full',
    }),
    style({
      selectors: {
        '&::-webkit-datetime-edit-year-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-month-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-day-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-hour-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-minute-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-second-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-millisecond-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-ampm-field:focus': {
          backgroundColor: vars.colors.accent,
        },
        '&::-webkit-datetime-edit-week-field:focus': {
          backgroundColor: vars.colors.accent,
        },
      },
    }),
  ],
  variants: {
    uppercase: {
      true: style({
        textTransform: 'uppercase',
      }),
      false: {},
    },
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
      false: {},
    },
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
        MozAppearance: 'textfield',
      }),
      text: {},
    },
    theme: {
      dark: style({
        selectors: {
          '&::-webkit-calendar-picker-indicator': { filter: 'invert(100%)' },
        },
      }),
      light: {},
    },
  },
})

export const ghost = recipe({
  base: [
    atoms({
      borderColor: 'transparent',
      inset: '0px',
      position: 'absolute',
      pointerEvents: 'none',
      whiteSpace: 'pre',
    }),
    style({ lineHeight: 'normal' }),
  ],
  variants: {
    type: {
      number: style({
        fontFeatureSettings: "'kern' 1,  'tnum' 1, 'calt' 0",
        fontVariantNumeric: 'tabular-nums',
      }),
      text: {},
    },
  },
})

export const variants = recipe({
  base: [style([container, text, atoms({ paddingX: '16px' })])],
  variants: {
    prefix: {
      true: atoms({
        paddingLeft: 'none',
      }),
    },
    suffix: {
      true: atoms({
        paddingRight: 'none',
      }),
    },
  },
})

export const max = style([
  atoms({
    backgroundColor: 'foregroundSecondary',
    borderRadius: 'medium',
    color: { base: 'textSecondary', hover: 'text' },
    cursor: 'pointer',
    fontSize: 'label',
    fontWeight: 'semiBold',
    height: 'max',
    lineHeight: 'none',
    padding: '8px',
    textTransform: 'uppercase',
    transitionDuration: '150',
    transitionProperty: 'colors',
    transitionTimingFunction: 'inOut',
    visibility: 'hidden',
  }),
  style({
    selectors: {
      [`${inputParent}:hover &`]: {
        visibility: 'visible',
      },
      [`${inputParent}:focus-within &`]: {
        visibility: 'visible',
      },
    },
  }),
])
