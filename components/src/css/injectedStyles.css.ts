import { createVar } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { recipe } from '@vanilla-extract/recipes'

// https://css-tricks.com/almanac/properties/a/aspect-ratio/
const aspectRatioVar = createVar()
export const aspectRatioFallback = recipe({
  base: {
    '@supports': {
      'not (aspect-ratio: 1 / 1)': {
        ':before': {
          float: 'left',
          paddingTop: calc.multiply(calc.divide(1, aspectRatioVar), '100%'),
          content: '',
        },
        ':after': {
          display: 'block',
          content: '',
          clear: 'both',
        },
      },
    },
  },
  variants: {
    ratio: {
      '1/1': {
        vars: { [aspectRatioVar]: 'calc(1 / 1)' },
      },
      '2/1': {
        vars: { [aspectRatioVar]: 'calc(2 / 1)' },
      },
      '4/1': {
        vars: { [aspectRatioVar]: 'calc(4 / 1)' },
      },
      '4/3': {
        vars: { [aspectRatioVar]: 'calc(4 / 3)' },
      },
      '16/9': {
        vars: { [aspectRatioVar]: 'calc(16 / 9)' },
      },
    },
  },
})
