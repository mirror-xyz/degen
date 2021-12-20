import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const inputParent = style({})

export const root = recipe({
  base: [
    atoms({
      backgroundColor: 'background',
      borderWidth: '0.5',
      borderColor: 'foregroundSecondary',
      borderRadius: '2xLarge',
      color: 'text',
      display: 'flex',
      height: '14',
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
  fontSize: 'base',
  fontWeight: 'medium',
})

const affix = style([container, text, style({ lineHeight: 'normal' })])
export const prefix = style([
  affix,
  atoms({ paddingLeft: '4', paddingRight: '2' }),
])
export const suffix = style([
  affix,
  atoms({ paddingRight: '4', paddingLeft: '2' }),
])

export const input = recipe({
  base: atoms({
    backgroundColor: 'transparent',
    position: 'relative',
    width: 'full',
  }),
  variants: {
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
      }),
      text: {},
    },
  },
})

export const ghost = recipe({
  base: [
    atoms({
      borderColor: 'transparent',
      inset: '0',
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
  base: [style([container, text, atoms({ paddingX: '4' })])],
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
    padding: '2',
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
