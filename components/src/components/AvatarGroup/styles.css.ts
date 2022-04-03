import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms, vars } from '../../css'

export const wrapper = style({
  boxShadow: `0 0 0 2px ${vars.colors.background}`,
  transform: `translateX(0px)`,
})

export const overflowText = recipe({
  variants: {
    size: {
      small: [
        atoms({
          alignSelf: 'stretch',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 'full',
        }),
        wrapper,
        {
          fontSize: 8,
          letterSpacing: '-0.009em',
          paddingLeft: '0.33rem',
          paddingRight: '0.33rem',
          marginLeft: '-0.1875rem',
        },
      ],
      large: atoms({
        fontSize: 'base',
        marginLeft: '1.5',
      }),
    },
    theme: {
      light: {},
      dark: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        size: 'small',
        theme: 'light',
      },
      style: {
        backgroundColor: '#ECECEC',
      },
    },
    {
      variants: {
        size: 'small',
        theme: 'dark',
      },
      style: {
        backgroundColor: '#262626',
      },
    },
  ],
})
