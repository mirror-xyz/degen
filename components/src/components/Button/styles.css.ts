import { createVar, fallbackVar, style } from '@vanilla-extract/css'
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
  medium: atoms({
    borderRadius: '1.5',
    fontSize: 'small',
    height: '10',
    paddingX: '4',
  }),
  large: atoms({
    borderRadius: '3',
    fontSize: 'base',
    height: '14',
    paddingX: '5',
  }),
}

export type Size = keyof typeof size

const toneAccentVar = createVar()
const toneAccentTextVar = createVar()

const getTone = ({
  accent,
  accentText = vars.mode.colors.white,
}: {
  accent: string
  accentText?: string
}) =>
  style({
    vars: {
      [toneAccentVar]: accent,
      [toneAccentTextVar]: accentText,
    },
  })

const tone = {
  accent: getTone({
    accent: vars.mode.colors.accent,
    accentText: vars.mode.colors.accentText,
  }),
  blue: getTone({ accent: vars.mode.colors.blue }),
  green: getTone({ accent: vars.mode.colors.green }),
  red: getTone({ accent: vars.mode.colors.red }),
}

export type Tone = keyof typeof tone

const variantTextVar = createVar()
const variantBackgroundVar = createVar()
const variantBackgroundHoverVar = createVar()

const getVariant = ({
  background,
  backgroundHover,
  text,
}: {
  background?: string
  backgroundHover?: string
  text: string
}) =>
  style({
    vars: {
      [variantTextVar]: text,
      ...(background ? { [variantBackgroundVar]: background } : {}),
      ...(backgroundHover
        ? { [variantBackgroundHoverVar]: backgroundHover }
        : {}),
    },
  })

const variant = {
  highlight: getVariant({
    text: rgb(toneAccentTextVar),
    background: rgb(toneAccentVar),
  }),
  primary: getVariant({
    text: rgb(toneAccentVar),
    background: rgb(toneAccentVar, vars.mode.shades.accentSecondary),
    backgroundHover: rgb(toneAccentVar, vars.mode.shades.accentSecondaryHover),
  }),
  secondary: getVariant({
    text: vars.colors.text,
    background: vars.colors.foregroundSecondary,
    backgroundHover: vars.colors.foregroundSecondaryHover,
  }),
  tertiary: getVariant({
    text: vars.colors.textSecondary,
    background: vars.colors.foregroundTertiary,
    backgroundHover: vars.colors.foregroundSecondary,
  }),
  transparent: getVariant({
    text: vars.colors.text,
    backgroundHover: vars.colors.foregroundSecondaryHover,
  }),
  transparentSecondary: getVariant({
    text: vars.colors.textSecondary,
    backgroundHover: vars.colors.foregroundSecondary,
  }),
}

export type Variant = keyof typeof variant

const getShapeSizeCompoundVariant = (shape: Shape, size: Size) => {
  return {
    variants: {
      shape,
      size,
    },
    style: atoms({
      minWidth: size === 'medium' ? '10' : '14',
    }),
  }
}

export const variants = recipe({
  base: [
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '4',
      justifyContent: 'center',
      transitionDuration: 150,
      transitionProperty: 'default',
      transitionTimingFunction: 'inOut',
    }),
    style({
      color: variantTextVar,
      background: variantBackgroundVar,
      boxShadow: `${vars.shadows['0']} ${variantBackgroundVar}`,
      ':hover': {
        background: fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        ),
        boxShadow: `${vars.shadows['1']} ${fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        )}`,
      },
      ':active': {
        background: fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        ),
        boxShadow: `${vars.shadows['0.5']} ${fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        )}`,
      },
      ':disabled': {
        boxShadow: 'none',
      },
    }),
  ],
  variants: {
    disabled: {
      true: style([
        getVariant({
          text: vars.colors.textSecondary,
          background: vars.colors.foregroundSecondary,
        }),
        atoms({
          cursor: 'not-allowed',
        }),
      ]),
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
    getShapeSizeCompoundVariant('circle', 'medium'),
    getShapeSizeCompoundVariant('circle', 'large'),
    getShapeSizeCompoundVariant('square', 'medium'),
    getShapeSizeCompoundVariant('square', 'large'),
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
        size: 'large',
      },
      style: atoms({
        paddingX: '15',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
