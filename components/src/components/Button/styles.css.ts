import { createVar, fallbackVar, style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '~/theme'

const shape = {
  circle: atoms({
    borderRadius: 'full',
    padding: 'px',
  }),
  square: atoms({
    borderRadius: 'md',
    padding: 'px',
  }),
}

export type Shape = keyof typeof shape

const size = {
  md: atoms({
    borderRadius: 'md',
    fontSize: 'small',
    height: '10',
    paddingX: '4',
  }),
  lg: atoms({
    borderRadius: 'xl',
    fontSize: 'base',
    height: '14',
    paddingX: '5',
  }),
}

export type Size = keyof typeof size

const toneAccentVar = createVar()

const getTone = ({ accent }: { accent: string }) =>
  style({
    vars: {
      [toneAccentVar]: accent,
    },
  })

const tone = {
  accent: getTone({ accent: vars.mode.colors.accent }),
  blue: getTone({ accent: vars.mode.colors.blue }),
  green: getTone({ accent: vars.mode.colors.green }),
  red: getTone({ accent: vars.mode.colors.red }),
  indigo: getTone({ accent: vars.mode.colors.indigo }),
}

export type Tone = keyof typeof tone

const variantTextVar = createVar()
const variantBackgroundVar = createVar()
const variantTextHoverVar = createVar()
const variantBackgroundHoverVar = createVar()

const getVariant = ({
  background,
  backgroundHover,
  text,
  textHover,
}: {
  background?: string
  backgroundHover?: string
  text: string
  textHover?: string
}) =>
  style({
    vars: {
      [variantTextVar]: text,
      ...(textHover ? { [variantTextHoverVar]: textHover } : {}),
      ...(background ? { [variantBackgroundVar]: background } : {}),
      ...(backgroundHover
        ? { [variantBackgroundHoverVar]: backgroundHover }
        : {}),
    },
  })

const variant = {
  highlight: getVariant({
    text: rgb(vars.mode.colors.accentText),
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
      minWidth: size === 'md' ? '10' : '14',
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
      boxShadow: `0 0 0 0 ${variantBackgroundVar}`,
      ':hover': {
        color: fallbackVar(variantTextHoverVar, variantTextVar),
        background: fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        ),
        boxShadow: `0 0 0 0.25rem ${fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        )}`,
      },
      ':active': {
        color: fallbackVar(variantTextHoverVar, variantTextVar),
        background: fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        ),
        boxShadow: `0 0 0 0.125rem ${fallbackVar(
          variantBackgroundHoverVar,
          variantBackgroundVar,
        )}`,
      },
      ':disabled': {
        background: variantBackgroundVar,
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
    getShapeSizeCompoundVariant('circle', 'md'),
    getShapeSizeCompoundVariant('circle', 'lg'),
    getShapeSizeCompoundVariant('square', 'md'),
    getShapeSizeCompoundVariant('square', 'lg'),
    {
      variants: {
        center: true,
        size: 'md',
      },
      style: atoms({
        paddingX: '14',
      }),
    },
    {
      variants: {
        center: true,
        size: 'lg',
      },
      style: atoms({
        paddingX: '15',
      }),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
