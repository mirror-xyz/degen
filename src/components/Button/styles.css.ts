import { createVar, fallbackVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, rgb, vars } from '~/theme'

const size = {
  md: atoms({
    borderRadius: 'md',
    fontSize: 'base',
    height: 10,
    paddingX: 4,
  }),
  lg: atoms({
    borderRadius: 'xl',
    fontSize: 'lg',
    height: 14,
    paddingX: 5,
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

export const variants = recipe({
  base: [
    atoms({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: 4,
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
    size,
    tone,
    variant,
  },
  defaultVariants: {
    size: 'lg',
    variant: 'highlight',
  },
})

export type Variants = Parameters<typeof variants>[0]
