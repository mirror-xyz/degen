import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '../../css'

export const root = recipe({
  base: [
    atoms({
      borderRadius: '2xLarge',
      overflow: 'hidden',
      position: 'relative',
      transitionDuration: '150',
      transitionProperty: 'colors',
      transitionTimingFunction: 'inOut',
      width: 'full',
      display: 'flex',
      alignItems: 'center',
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        borderColor: 'foregroundSecondary',
        cursor: 'not-allowed',
      }),
    },
    droppable: {
      true: style({
        borderStyle: 'dashed',
      }),
    },
    focused: {
      true: atoms({
        borderColor: 'accent',
      }),
      false: atoms({
        borderColor: 'foregroundSecondary',
      }),
    },
  },
})

export const label = recipe({
  base: atoms({
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    gap: '20px',
    width: 'full',
  }),
  variants: {
    compact: {
      true: atoms({
        flexDirection: 'row',
        padding: '16px',
        paddingRight: '48px',
      }),
      false: atoms({
        padding: '40px',
      }),
    },
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
    },
  },
  defaultVariants: {
    compact: false,
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
    overflow: 'hidden',
    position: 'relative',
  }),
  variants: {
    compact: {
      true: atoms({
        height: '64px',
        minWidth: '64px',
      }),
      false: atoms({
        height: '128px',
        width: '128px',
      }),
    },
  },
  defaultVariants: {
    compact: false,
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
        gap: '6px',
        textAlign: 'left',
      }),
      false: atoms({
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
      }),
    },
  },
  defaultVariants: {
    compact: false,
  },
})

export const cover = style([
  atoms({
    backgroundColor: 'background',
    minHeight: 'full',
    minWidth: 'full',
  }),
  style({
    objectFit: 'cover',
    objectPosition: 'center',
  }),
])

export const removeButton = style({
  background: `linear-gradient(0deg, ${rgb(
    vars.mode.colors.background,
    '0.8',
  )}, ${rgb(vars.mode.colors.background, '0.8')}), ${rgb(
    vars.mode.colors.foreground,
    '0.075',
  )}`,
  backdropFilter: 'blur(4px)',
  color: rgb(vars.mode.colors.foreground, '0.4'),
})
