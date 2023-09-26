import { createVar, style } from '@vanilla-extract/css'
import { CSSVarFunction } from '@vanilla-extract/private'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '../../css'

const boxShadowColorVar = createVar()
const buttonSize = createVar()

const shape = {
  circle: [
    { minWidth: buttonSize, padding: 0 },
    atoms({
      borderRadius: 'full',
    }),
  ],
  square: { minWidth: buttonSize, padding: 0 },
}

export type Shape = keyof typeof shape

const size = {
  extraSmall: [
    {
      vars: {
        [buttonSize]: vars.space['32px'],
      },
    },
    atoms({
      borderRadius: 'large',
      fontSize: 'label',
      paddingX: '14px',
      gap: '8px',
    }),
  ],
  small: [
    {
      vars: {
        [buttonSize]: vars.space['40px'],
      },
    },
    atoms({
      borderRadius: 'large',
      fontSize: 'extraSmall',
      paddingX: '16px',
      gap: '8px',
    }),
  ],
  medium: [
    {
      vars: {
        [buttonSize]: vars.space['48px'],
      },
    },
    atoms({
      borderRadius: 'large',
      fontSize: 'small',
      paddingX: '16px',
      gap: '12px',
    }),
  ],
  large: [
    {
      vars: {
        [buttonSize]: vars.space['56px'],
      },
    },
    atoms({
      borderRadius: '2xLarge',
      fontSize: 'base',
      paddingX: '20px',
      gap: '16px',
    }),
  ],
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
  background: {},
  blue: style({
    vars: getAccentVars(vars.mode.colors.blue),
  }),
  green: style({
    vars: getAccentVars(vars.mode.colors.green),
  }),
  red: style({
    vars: getAccentVars(vars.mode.colors.red),
  }),
  purple: style({
    vars: getAccentVars(vars.mode.colors.purple),
  }),
  pink: style({
    vars: getAccentVars(vars.mode.colors.pink),
  }),
}

export type Tone = keyof typeof tone

const variant = {
  primary: style([
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
  secondary: style([
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
  tertiary: style([
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

export const variants = recipe({
  base: style([
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      transitionDuration: '150',
      transitionProperty: 'default',
      transitionTimingFunction: 'inOut',
    }),
    style({
      height: buttonSize,
      boxShadow: `${vars.shadows['0']} ${boxShadowColorVar}`,
      selectors: {
        '&:hover': {
          boxShadow: `${vars.shadows['1']} ${boxShadowColorVar}`,
        },
        '&:active': {
          boxShadow: `${vars.shadows['0.5']} ${boxShadowColorVar}`,
        },
        '&:disabled': {
          backgroundColor: vars.colors.foregroundSecondary,
          color: vars.colors.textTertiary,
          boxShadow: 'none',
        },
      },
    }),
  ]),
  variants: {
    disabled: {
      true: atoms({
        cursor: 'not-allowed',
      }),
      false: {},
    },
    center: {
      true: atoms({
        position: 'relative',
      }),
      false: {},
    },
    shape,
    size,
    tone,
    variant,
  },
  compoundVariants: [
    // Center + Size
    {
      variants: {
        center: true,
        size: 'large',
      },
      style: atoms({
        paddingX: '56px',
      }),
    },
    // background tone
    {
      variants: {
        tone: 'background',
        variant: 'secondary',
      },
      style: style({
        vars: {
          [boxShadowColorVar]: vars.colors.background,
          [vars.colors.accentSecondaryHover]: vars.colors.background,
        },
        backgroundColor: vars.colors.background,
      }),
    },
    {
      variants: {
        center: true,
        size: 'large',
      },
      style: atoms({
        paddingX: '60px',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
