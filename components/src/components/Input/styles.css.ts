import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '~/css'

export const root = recipe({
  base: [
    atoms({
      borderWidth: '2px',
      borderColor: 'foregroundSecondary',
      borderRadius: '4',
      color: 'text',
      display: 'flex',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
      width: 'full',
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
        cursor: 'default',
      }),
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
  height: '14',
  lineHeight: 'none',
})

const text = atoms({
  color: 'inherit',
  fontFamily: 'sans',
  fontSize: 'base',
  fontWeight: 'medium',
})

export const icon = style([
  container,
  atoms({ paddingLeft: '4', paddingRight: '2' }),
])
export const prefix = style([
  container,
  text,
  atoms({ paddingLeft: '4', paddingRight: '1.5' }),
])

export const input = atoms({
  backgroundColor: 'transparent',
  position: 'relative',
  width: 'full',
})

export const ghost = atoms({
  borderColor: 'transparent',
  inset: '0',
  position: 'absolute',
  pointerEvents: 'none',
  whiteSpace: 'pre',
})

export const variants = recipe({
  base: [style([container, text, atoms({ paddingX: '4' })])],
  variants: {
    icon: {
      true: atoms({
        paddingLeft: 'none',
      }),
    },
    prefix: {
      true: atoms({
        paddingLeft: 'none',
      }),
    },
  },
})

export const maxParent = style({})

export const max = style([
  atoms({
    backgroundColor: 'foregroundSecondary',
    borderRadius: '1.5',
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
      [`${maxParent}:hover &`]: {
        visibility: 'visible',
      },
      [`${maxParent}:focus-within &`]: {
        visibility: 'visible',
      },
    },
  }),
])
