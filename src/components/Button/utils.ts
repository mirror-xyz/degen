import { BoxProps } from '../Box'

export const getCenterProps = (
  center: boolean | undefined,
  side: 'left' | 'right',
): BoxProps => (center ? { position: 'absolute', [side]: 4 } : {})
