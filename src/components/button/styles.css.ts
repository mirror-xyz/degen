import { styleVariants } from '@vanilla-extract/css'

import { SelectorValue, normalizeSelectorValue } from '~/styles/atoms.css'
import { vars } from '~/styles/theme.css'

import { Variant } from './button'

const variants: Record<Variant, SelectorValue<string>> = {
  highlight: vars.color.accent,
  primary: {
    base: vars.color.accentSecondary,
    hover: vars.color.accentSecondaryHover,
  },
  secondary: {
    base: vars.color.foregroundSecondary,
    hover: vars.color.foregroundSecondaryHover,
  },
  tertiary: {
    base: vars.color.foregroundTertiary,
    hover: vars.color.foregroundSecondary,
  },
  transparent: {
    hover: vars.color.foregroundSecondaryHover,
  },
  transparentSecondary: {
    hover: vars.color.foregroundSecondaryHover,
  },
  positive: vars.color.green,
  critical: vars.color.red,
}

export const boxShadowVariants = styleVariants(variants, (x) => {
  const normalized = normalizeSelectorValue(x)
  const base = normalized.base
  const hover = normalized.hover ?? normalized.base
  return {
    boxShadow: `0 0 0 0 ${base}`,
    ':hover': {
      boxShadow: `0 0 0 0.25rem ${hover}`,
    },
    ':active': {
      boxShadow: `0 0 0 0.125rem ${hover}`,
    },
  }
})
