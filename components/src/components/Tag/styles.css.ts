import { style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '~/css'

export const label = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
})

const getToneHoverCompoundVariant = (
  tone: 'critical' | 'info' | 'positive',
) => {
  const color = rgb(
    {
      critical: vars.mode.colors.red,
      info: vars.mode.colors.blue,
      positive: vars.mode.colors.green,
    }[tone],
    vars.mode.shades.accentSecondary,
  )
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
    tone: {
      accent: atoms({
        color: 'accent',
        backgroundColor: 'accentTertiary',
      }),
      neutral: atoms({
        color: 'textSecondary',
        backgroundColor: 'foregroundTertiary',
      }),
      critical: style([
        atoms({
          color: 'red',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.red),
        }),
      ]),
      info: style([
        atoms({
          color: 'blue',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.blue),
        }),
      ]),
      positive: style([
        atoms({
          color: 'green',
        }),
        style({
          backgroundColor: getToneColor(vars.mode.colors.green),
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
        tone: 'neutral',
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
    getToneHoverCompoundVariant('critical'),
    getToneHoverCompoundVariant('info'),
    getToneHoverCompoundVariant('positive'),
  ],
})

export type Variants = RecipeVariants<typeof variants>
