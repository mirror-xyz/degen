import { createVar, style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '~/css'

const shape = {
  circle: atoms({
    borderRadius: 'full',
    padding: 'px',
  }),
  square: atoms({
    borderRadius: '1.5',
    padding: 'px',
  }),
}

export type Shape = keyof typeof shape

const size = {
  small: atoms({
    borderRadius: '1.5',
    fontSize: 'small',
    height: '10',
    paddingX: '4',
  }),
  medium: atoms({
    borderRadius: '3',
    fontSize: 'base',
    height: '14',
    paddingX: '5',
  }),
}

export type Size = keyof typeof size

const getAccentVars = (colorVar: CSSVarFunction) => ({
  [vars.colors.accent]: rgb(colorVar),
  [vars.colors.accentText]: vars.colors.white,
  [vars.colors.accentSecondary]: rgb(
    colorVar,
    vars.mode.shades.accentSecondary,
  ),
  [vars.colors.accentSecondaryHover]: rgb(
    colorVar,
    vars.mode.shades.accentSecondaryHover,
  ),
})

const tone = {
  accent: {},
  critical: style({
    vars: getAccentVars(vars.mode.colors.red),
  }),
  positive: style({
    vars: getAccentVars(vars.mode.colors.green),
  }),
  info: style({
    vars: getAccentVars(vars.mode.colors.blue),
  }),
}

export type Tone = keyof typeof tone

const boxShadowColorVar = createVar()

const variant = {
  highlight: style([
    atoms({
      color: 'accentText',
      backgroundColor: 'accent',
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.accent,
      },
    }),
  ]),
  primary: style([
    atoms({
      color: 'accent',
      backgroundColor: {
        base: 'accentSecondary',
        hover: 'accentSecondaryHover',
        active: 'accentSecondaryHover',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.accentSecondary,
      },
      selectors: {
        '&:hover': {
          vars: {
            [boxShadowColorVar]: vars.colors.accentSecondaryHover,
          },
        },
        '&:active': {
          vars: {
            [boxShadowColorVar]: vars.colors.accentSecondaryHover,
          },
        },
      },
    }),
  ]),
  secondary: style([
    atoms({
      color: 'text',
      backgroundColor: {
        base: 'foregroundSecondary',
        hover: 'foregroundSecondaryHover',
        active: 'foregroundSecondaryHover',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.foregroundSecondary,
      },
      selectors: {
        '&:hover': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundSecondaryHover,
          },
        },
        '&:active': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundSecondaryHover,
          },
        },
      },
    }),
  ]),
  transparent: style([
    atoms({
      color: 'textTertiary',
      backgroundColor: {
        hover: 'foregroundTertiary',
        active: 'foregroundTertiary',
      },
    }),
    style({
      vars: {
        [boxShadowColorVar]: vars.colors.transparent,
      },
      selectors: {
        '&:hover': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundTertiary,
          },
        },
        '&:active': {
          vars: {
            [boxShadowColorVar]: vars.colors.foregroundTertiary,
          },
        },
      },
    }),
  ]),
}

export type Variant = keyof typeof variant

const getShapeSizeCompoundVariant = (shape: Shape, size: Size) => ({
  variants: {
    shape,
    size,
  },
  style: atoms({
    minWidth: size === 'small' ? '10' : '14',
  }),
})

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '4',
      justifyContent: 'center',
      transitionDuration: '150',
      transitionProperty: 'default',
      transitionTimingFunction: 'inOut',
    }),
    style({
      boxShadow: `${vars.shadows['0']} ${boxShadowColorVar}`,
      selectors: {
        '&:hover': {
          boxShadow: `${vars.shadows['1']} ${boxShadowColorVar}`,
        },
        '&:active': {
          boxShadow: `${vars.shadows['0.5']} ${boxShadowColorVar}`,
        },
        '&:disabled': {
          boxShadow: 'none',
        },
      },
    }),
  ]),
  variants: {
    disabled: {
      true: atoms({
        color: 'textTertiary',
        backgroundColor: 'foregroundSecondary',
        cursor: 'not-allowed',
      }),
    },
    center: {
      true: atoms({
        position: 'relative',
      }),
    },
    shape,
    size,
    tone,
    variant,
  },
  compoundVariants: [
    // Shape + Size
    getShapeSizeCompoundVariant('circle', 'medium'),
    getShapeSizeCompoundVariant('circle', 'small'),
    getShapeSizeCompoundVariant('square', 'medium'),
    getShapeSizeCompoundVariant('square', 'small'),
    // Center + Size
    {
      variants: {
        center: true,
        size: 'medium',
      },
      style: atoms({
        paddingX: '14',
      }),
    },
    {
      variants: {
        center: true,
        size: 'medium',
      },
      style: atoms({
        paddingX: '15',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
