import { BoxProps } from '../Box'
import { Size } from './styles.css'

export const getCenterProps = (
  center: boolean | undefined,
  size: Size,
  side: 'left' | 'right',
): Pick<BoxProps, 'position'> => {
  if (!center) return {}
  const props: BoxProps = {
    position: 'absolute',
    [side]: size === 'large' ? 4 : 5,
  }
  return props
}
