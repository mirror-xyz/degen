import * as React from 'react'

import { WithChildren } from '~/types'
import { Atoms } from '~/styles/atoms.css'
import { Box, createVariants } from '../box'

const variants = createVariants({
  base: {
    color: 'foreground',
  },
  description: {
    fontSize: { sm: 'lg', md: 'xl' },
    wordWrap: 'break-word',
    letterSpacing: { sm: 'normal', md: 'snug' },
    fontWeight: 550,
    color: 'textTertiary',
  },
  title: {
    color: 'text',
    fontSize: { sm: '3xl', md: '4xl', lg: '5xl' },
    fontWeight: 'semibold',
    letterSpacing: { sm: 'snug', md: 'tight' },
    lineHeight: { sm: 'snug', md: 'tight' },
  },
})

type Props = WithChildren<{
  as?: 'div' | 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color: Atoms['color']
  variant?: keyof typeof variants
  weight?: Atoms['fontWeight']
}>

export const Text = ({
  as = 'div',
  color,
  children,
  variant = 'base',
  weight,
}: Props) => {
  return (
    <Box as={as} color={color} fontWeight={weight} {...variants[variant]}>
      {children}
    </Box>
  )
}
