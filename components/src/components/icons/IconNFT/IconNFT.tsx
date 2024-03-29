import * as React from 'react'

import { Box, BoxProps } from '../../Box'
import { OptionalTitle } from '../types'
import { IconNFTSvg } from './IconNFTSVG'

type Props = {
  className?: BoxProps['className']
  color?: BoxProps['color']
  size?: BoxProps['height']
  strokeWidth?: BoxProps['strokeWidth']
} & OptionalTitle

export const IconNFT = ({
  color,
  size = '24px',
  strokeWidth = '2px',
  ...props
}: Props) => {
  return (
    <Box
      as={IconNFTSvg}
      color={color}
      height={size}
      strokeWidth={strokeWidth}
      width="auto"
      {...props}
    />
  )
}
