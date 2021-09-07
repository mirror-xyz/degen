import * as React from 'react'

import { Box, BoxProps, createVariants, useBoxProps } from '../box'

const variants = createVariants({
  base: {
    color: 'text',
    fontFamily: 'sans',
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
  color?: BoxProps['color']
  font?: BoxProps['fontFamily']
  letterSpacing?: BoxProps['letterSpacing']
  lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize']
  variant?: keyof typeof variants
  weight?: BoxProps['fontWeight']
  whiteSpace?: BoxProps['whiteSpace']
}

export const Text = React.forwardRef(
  (
    {
      as,
      children,
      color,
      font,
      letterSpacing,
      lineHeight,
      size,
      variant = 'base',
      weight,
      whiteSpace,
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const boxProps = useBoxProps({
      color,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      letterSpacing,
      lineHeight,
      whiteSpace,
    })
    return (
      <Box as={as} ref={ref} {...variants[variant]} {...boxProps}>
        {children}
      </Box>
    )
  },
)
