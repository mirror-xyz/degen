import { styleVariants } from '@vanilla-extract/css'

import { normalizeSelectorValue } from '~/styles/atoms.css'
import { vars } from '~/styles/theme.css'

export const variants = styleVariants(
  {
    highlight: {
      color: vars.color.accentText,
      background: vars.color.accent,
    },
    primary: {
      color: vars.color.accent,
      background: {
        base: vars.color.accentSecondary,
        hover: vars.color.accentSecondaryHover,
      },
    },
    secondary: {
      color: vars.color.text,
      background: {
        base: vars.color.foregroundSecondary,
        hover: vars.color.foregroundSecondaryHover,
      },
    },
    tertiary: {
      color: vars.color.textSecondary,
      background: {
        base: vars.color.foregroundTertiary,
        hover: vars.color.foregroundSecondary,
      },
    },
    transparent: {
      color: vars.color.text,
      background: {
        hover: vars.color.foregroundSecondaryHover,
      },
    },
    transparentSecondary: {
      color: vars.color.textSecondary,
      background: {
        hover: vars.color.foregroundSecondaryHover,
      },
    },
    positive: {
      color: vars.color.accentText,
      background: vars.color.green,
    },
    critical: {
      color: vars.color.accentText,
      background: vars.color.red,
    },
  },
  (x) => {
    const normalized = normalizeSelectorValue(x.background)
    const base = normalized.base
    const hover = normalized.hover ?? normalized.base
    return {
      background: base,
      boxShadow: `0 0 0 0 ${base}`,
      color: x.color,
      ':hover': {
        background: hover,
        boxShadow: `0 0 0 0.25rem ${hover}`,
      },
      ':active': {
        background: hover,
        boxShadow: `0 0 0 0.125rem ${hover}`,
      },
    }
  },
)
