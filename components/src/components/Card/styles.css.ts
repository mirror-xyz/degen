import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { createVar, style } from '@vanilla-extract/css'

import { atoms, responsiveStyle, rgb, vars } from '../../css'

const radiiVar = createVar()

export const variants = recipe({
  base: [
    atoms({
      borderRadius: { xs: '2xLarge', lg: '3xLarge' },
    }),
  ],
  variants: {
    dark: {
      true: atoms({
        backgroundColor: 'black',
      }),
      false: style([
        atoms({
          backgroundColor: 'white',
        }),
      ]),
    },
    shadow: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
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
          lg: {
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
