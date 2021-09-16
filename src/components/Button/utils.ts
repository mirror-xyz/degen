import { BoxProps } from '../Box'
import * as styles from './styles.css'

export const getCenterProps = (
  center: boolean | undefined,
  size: styles.Size,
  side: 'left' | 'right',
): Pick<BoxProps, 'position'> => {
  if (!center) return {}
  const props: BoxProps = {
    position: 'absolute',
    [side]: size === 'md' ? 4 : 5,
  }
  return props
}
