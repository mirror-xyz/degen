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
      width: 'full',
    }),
    style({
      ':focus-within': {
        borderColor: vars.colors.accent,
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
      true: atoms({
        borderColor: 'red',
        cursor: 'default',
      }),
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

export const icon = style([container, atoms({ paddingLeft: '4' })])

export const prefix = style([container, text, atoms({ paddingLeft: '4' })])

export const input = atoms({
  backgroundColor: 'transparent',
  position: 'relative',
  transitionDuration: '150',
  transitionProperty: 'colors',
  transitionTimingFunction: 'inOut',
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
        paddingLeft: '0',
      }),
    },
    prefix: {
      true: atoms({
        paddingLeft: '0',
      }),
    },
  },
})
