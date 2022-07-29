import { recipe } from '@vanilla-extract/recipes'

import { atoms } from '../../css'

export const card = atoms({
  backgroundColor: 'backgroundSecondary',
  borderBottomRadius: 'none',
  borderTopRadius: 'large',
  padding: '4',
  display: 'flex',
  flexDirection: 'row',
  color: 'textSecondary',
  letterSpacing: '-0.01',
  lineHeight: '1.5',
  fontSize: 'small',
  fontWeight: 'normal',
  justifyContent: 'center',
})

export const variants = recipe({
  base: [
    atoms({
      borderBottomRadius: 'large',
      fontSize: 'small',
      fontWeight: 'semiBold',
      height: '12',
      paddingX: '4',
      transitionDuration: '150',
      transitionProperty: 'colors',
      width: 'full',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ],
  variants: {
    disabled: {
      true: atoms({
        backgroundColor: 'foregroundSecondary',
        color: 'textTertiary',
        cursor: 'not-allowed',
      }),
      false: atoms({
        backgroundColor: 'accent',
        color: 'accentText',
        cursor: 'pointer',
      }),
    },
  },
})
