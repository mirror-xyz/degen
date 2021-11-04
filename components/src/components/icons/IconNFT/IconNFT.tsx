import * as React from 'react'

import { Box, BoxProps } from '../../Box'
import { OptionalTitle } from '../types'
import { IconNFTSvg } from './IconNFTSVG'

type Props = {
  className?: BoxProps['className']
  color?: BoxProps['color']
  size?: BoxProps['height']
} & OptionalTitle

export const IconNFT = ({ color, size = '6', ...props }: Props) => {
  return (
    <Box as={IconNFTSvg} color={color} height={size} width="auto" {...props} />
  )
}
