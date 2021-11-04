import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const root = recipe({
  base: [
    atoms({
      backgroundColor: 'transparent',
      borderColor: 'foregroundSecondary',
      borderRadius: '2xLarge',
      borderWidth: '2px',
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
        cursor: 'not-allowed',
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

export const label = recipe({
  base: atoms({
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '5',
    width: 'full',
  }),
  variants: {
    compact: {
      true: atoms({
        flexDirection: 'row',
        padding: '4',
      }),
      false: atoms({
        padding: '10',
      }),
    },
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
    },
  },
})

export const preview = recipe({
  base: atoms({
    alignItems: 'center',
    backgroundColor: 'foregroundTertiary',
    borderRadius: 'large',
    color: 'textTertiary',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  variants: {
    compact: {
      true: atoms({
        minWidth: '16',
        minHeight: '16',
      }),
      false: atoms({
        size: '32',
      }),
    },
  },
})

export const content = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
  }),
  variants: {
    compact: {
      true: atoms({
        alignItems: 'flex-start',
        gap: '1',
        textAlign: 'left',
      }),
      false: atoms({
        alignItems: 'center',
        gap: '4',
        textAlign: 'center',
      }),
    },
  },
})
