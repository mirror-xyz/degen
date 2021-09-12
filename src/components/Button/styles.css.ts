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

const accent = createVar()

const tone = {
  accent: style({
    vars: {
      [accent]: vars.mode.colors.accent,
    },
  }),
  blue: style({
    vars: {
      [accent]: vars.mode.colors.blue,
    },
  }),
  green: style({
    vars: {
      [accent]: vars.mode.colors.green,
    },
  }),
  red: style({
    vars: {
      [accent]: vars.mode.colors.red,
    },
  }),
}

export type Tone = keyof typeof tone

const textBase = createVar()
const backgroundBase = createVar()
const textHover = createVar()
const backgroundHover = createVar()

const variant = {
  highlight: style({
    vars: {
      [textBase]: rgb(vars.mode.colors.accentText),
      [backgroundBase]: rgb(accent),
    },
  }),
  primary: style({
    vars: {
      [textBase]: rgb(accent),
      [backgroundBase]: rgb(accent, vars.mode.shades.accentSecondary),
      [backgroundHover]: rgb(accent, vars.mode.shades.accentSecondaryHover),
    },
  }),
  secondary: style({
    vars: {
      [textBase]: vars.colors.text,
      [backgroundBase]: vars.colors.foregroundSecondary,
      [backgroundHover]: vars.colors.foregroundSecondaryHover,
    },
  }),
  tertiary: style({
    vars: {
      [textBase]: vars.colors.textSecondary,
      [backgroundBase]: vars.colors.foregroundTertiary,
      [backgroundHover]: vars.colors.foregroundSecondary,
    },
  }),
}

export type Variant = keyof typeof variant

export const root = recipe({
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
      color: textBase,
      background: backgroundBase,
      boxShadow: `0 0 0 0 ${backgroundBase}`,
      ':hover': {
        color: fallbackVar(textHover, textBase),
        background: fallbackVar(backgroundHover, backgroundBase),
        boxShadow: `0 0 0 0.25rem ${fallbackVar(
          backgroundHover,
          backgroundBase,
        )}`,
      },
      ':active': {
        color: fallbackVar(textHover, textBase),
        background: backgroundHover,
        boxShadow: `0 0 0 0.125rem ${fallbackVar(
          backgroundHover,
          backgroundBase,
        )}`,
      },
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        backgroundColor: 'foregroundSecondary',
        color: 'textSecondary',
        cursor: 'not-allowed',
      }),
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
