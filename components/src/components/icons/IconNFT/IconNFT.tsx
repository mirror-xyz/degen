import * as React from 'react'

import { Atoms } from '../../../css'
import { Box } from '../../Box'
import { OptionalTitle } from '../types'
import { IconNFTSvg } from './IconNFTSVG'

type BoxProps = Parameters<typeof Box>[0]

type Props = Pick<BoxProps, 'className'> & {
  size?: Atoms['size']
  color?: Atoms['color']
} & OptionalTitle

export const IconNFT = ({ size = '6', color, ...props }: Props) => {
  return (
    <Box as={IconNFTSvg} color={color} height={size} width="auto" {...props} />
  )
}
