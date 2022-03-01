import { style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '../../css'

export const label = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
})

const getToneHoverCompoundVariant = (tone: 'blue' | 'green' | 'red') => {
  const color = vars.mode.colors[tone]
  return {
    variants: {
      hover: true,
      tone,
    },
    style: {
      selectors: {
        '&:active': {
          backgroundColor: color,
        },
        '&:hover': {
          backgroundColor: color,
        },
      },
    },
  }
}

const getToneColor = (color: CSSVarFunction) =>
  rgb(color, `calc(${vars.mode.shades.accentSecondary} * 0.5)`)

export const variants = recipe({
  base: [
    atoms({
      alignItems: 'center',
      borderRadius: 'full',
      display: 'flex',
      fontWeight: 'medium',
      width: 'max',
    }),
  ],
  variants: {
    hover: {
      true: atoms({
        transitionProperty: 'colors',
        transitionDuration: '150',
        transitionTimingFunction: 'inOut',
      }),
      false: {},
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
    tone: {
      accent: atoms({
        color: 'accent',
        backgroundColor: 'accentTertiary',
      }),
      blue: style([
        atoms({
          color: 'blue',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.blue),
        }),
      ]),
      green: style([
        atoms({
          color: 'green',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.green),
        }),
      ]),
      secondary: atoms({
        color: 'textTertiary',
        backgroundColor: 'foregroundTertiary',
      }),
      red: style([
        atoms({
          color: 'red',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.red),
        }),
      ]),
      orange: style([
        atoms({
          color: 'orange',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.orange),
        }),
      ]),
      purple: style([
        atoms({
          color: 'purple',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.purple),
        }),
      ]),
      pink: style([
        atoms({
          color: 'pink',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.pink),
        }),
      ]),
    },
  },
  compoundVariants: [
    {
      variants: {
        hover: true,
        tone: 'accent',
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
        tone: 'secondary',
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
    getToneHoverCompoundVariant('blue'),
    getToneHoverCompoundVariant('green'),
    getToneHoverCompoundVariant('red'),
  ],
})

export type Variants = RecipeVariants<typeof variants>
