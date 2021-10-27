import * as React from 'react'

import { Atoms } from '~/css'
import { Box } from '../../Box'
import { OptionalTitle } from '../types'
import { IconNFTSvg } from './IconNFTSVG'

type BoxProps = Parameters<typeof Box>[0]

type Props = Pick<BoxProps, 'className'> & {
  size?: Atoms['size']
  tone?: Atoms['color']
} & OptionalTitle

export const IconNFT = ({ size = '6', tone, ...props }: Props) => {
  return (
    <Box as={IconNFTSvg} color={tone} height={size} width="auto" {...props} />
  )
}
