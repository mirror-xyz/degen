import { atoms } from '~/theme'
import { createBox } from './createBox'

export type BoxProps = Parameters<typeof atoms>[0]

export const { Box, createVariants } = createBox({ atoms })
