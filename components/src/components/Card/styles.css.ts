import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { createVar, style } from '@vanilla-extract/css'

import { atoms, responsiveStyle, rgb, vars } from '../../css'

const radiiVar = createVar()

export const variants = recipe({
  variants: {
    hover: {
      true: style([
        atoms({
          transitionProperty: 'shadow',
          transitionTimingFunction: 'inOut',
        }),
        style({
          transitionDuration: '150ms',
          selectors: {
            '&:hover': {
              boxShadow: `${vars.shadows['1']} ${vars.colors['foregroundTertiary']}`,
            },
            '&:active': {
              boxShadow: `${vars.shadows['0.5']} ${vars.colors['foregroundTertiary']}`,
            },
          },
        }),
      ]),
      false: {},
    },
    level: {
      '1': {},
      '2': atoms({
        backgroundColor: 'background',
      }),
    },
    dark: {
      true: {},
      false: {},
    },
    shadow: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        dark: true,
        level: '1',
      },
      style: atoms({
        backgroundColor: 'black',
      }),
    },
    {
      variants: {
        dark: false,
        level: '1',
      },
      style: atoms({
        backgroundColor: 'white',
      }),
    },
    {
      variants: {
        dark: false,
        shadow: true,
      },
      style: style([
        responsiveStyle({
          xs: {
            vars: {
              [radiiVar]: vars.radii['2xLarge'],
            },
          },
          sm: {
            vars: {
              [radiiVar]: vars.radii['3xLarge'],
            },
          },
        }),
        style({
          boxShadow: `0px 0px ${radiiVar} ${rgb('0,0,0', '0.1')}`,
        }),
      ]),
    },
  ],
})

export type Variants = RecipeVariants<typeof variants>
