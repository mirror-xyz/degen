import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '~/css'

export const label = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
})

export const variants = recipe({
  base: [
    atoms({
      alignItems: 'center',
      borderRadius: 'full',
      display: 'flex',
      fontWeight: 'medium',
      transitionProperty: 'colors',
      transitionDuration: '150',
      transitionTimingFunction: 'inOut',
      width: 'max',
    }),
  ],
  variants: {
    hover: {
      true: {},
    },
    size: {
      small: atoms({
        height: '5',
        fontSize: 'label',
      }),
      medium: atoms({
        height: '6',
        fontSize: 'small',
      }),
    },
    variant: {
      primary: atoms({
        color: 'accent',
        backgroundColor: 'accentTertiary',
      }),
      secondary: atoms({
        color: 'textSecondary',
        backgroundColor: 'foregroundTertiary',
      }),
      tertiary: atoms({
        color: 'textTertiary',
        backgroundColor: 'foregroundTertiary',
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        hover: true,
        variant: 'primary',
      },
      style: atoms({
        backgroundColor: {
          base: 'accentTertiary',
          hover: 'accentSecondary',
          active: 'accentSecondary',
        },
      }),
    },
    {
      variants: {
        hover: true,
        variant: 'secondary',
      },
      style: atoms({
        color: { base: 'textSecondary', hover: 'text', active: 'text' },
        backgroundColor: {
          base: 'foregroundTertiary',
          hover: 'foregroundSecondary',
          active: 'foregroundSecondary',
        },
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
