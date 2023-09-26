import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const wrapper = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
  transform: `translateX(0px)`,
})

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
  },
})

export const overflowText = recipe({
  base: [
    wrapper,
    atoms({
      alignSelf: 'stretch',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'full',
    }),
  ],
  variants: {
    size: {
      small: [
        {
          fontSize: 8,
          letterSpacing: '-0.009em',
          paddingLeft: '0.33rem',
          paddingRight: '0.33rem',
          marginLeft: '-0.1875rem',
        },
      ],
      large: [
        atoms({
          fontSize: 'extraSmall',
          marginLeft: '-6px',
        }),
        {
          letterSpacing: '-0.009em',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        },
      ],
    },
    theme: {
      light: {
        backgroundColor: '#F6F6F6',
      },
      dark: {
        backgroundColor: '#1D1D1D',
      },
    },
  },
})
