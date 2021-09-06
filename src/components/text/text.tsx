import * as React from 'react'

import { Atoms } from '~/styles/atoms.css'
import { useBoxProps } from '~/hooks'
import { createVariants } from '~/utils'
import { Box } from '../box'

const variants = createVariants({
  base: {
    color: 'foreground',
    fontFamily: 'sans',
    fontSize: 'base',
  },
  description: {
    color: 'textTertiary',
    fontFamily: 'sans',
    fontSize: { sm: 'lg', md: 'xl' },
    fontWeight: 550,
    letterSpacing: { sm: 'normal', md: 'snug' },
    wordWrap: 'break-word',
  },
  title: {
    color: 'text',
    fontFamily: 'sans',
    fontSize: { sm: '3xl', md: '4xl', lg: '5xl' },
    fontWeight: 'semibold',
    letterSpacing: { sm: 'snug', md: 'tight' },
    lineHeight: { sm: 'snug', md: 'tight' },
  },
})

type Props = {
  as?: 'div' | 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  color?: Atoms['color']
  fontFamily?: Atoms['fontFamily']
  fontSize?: Atoms['fontSize']
  letterSpacing?: Atoms['letterSpacing']
  lineHeight?: Atoms['lineHeight']
  variant?: keyof typeof variants
  weight?: Atoms['fontWeight']
  whiteSpace?: Atoms['whiteSpace']
}

export const Text = ({
  as,
  color,
  children,
  fontFamily,
  fontSize,
  letterSpacing,
  lineHeight,
  variant = 'base',
  weight,
  whiteSpace,
}: Props) => {
  const boxProps = useBoxProps({
    color,
    fontFamily,
    fontSize,
    fontWeight: weight,
    letterSpacing,
    lineHeight,
    whiteSpace,
  })
  return (
    <Box as={as} {...variants[variant]} {...boxProps}>
      {children}
    </Box>
  )
}
