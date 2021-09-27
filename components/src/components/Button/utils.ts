import { Atoms } from '~/theme'
import { Size } from './styles.css'

export const getCenterProps = (
  center: boolean | undefined,
  size: Size,
  side: 'left' | 'right',
): Pick<Atoms, 'position'> => {
  if (!center) return {}
  const props: Atoms = {
    position: 'absolute',
    [side]: size === 'md' ? 4 : 5,
  }
  return props
}
