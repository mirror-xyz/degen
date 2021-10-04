import { Atoms } from '~/css'
import { Size } from './styles.css'

export const getCenterProps = (
  center: boolean | undefined,
  size: Size,
  side: 'left' | 'right',
): Pick<Atoms, 'position'> => {
  if (!center) return {}
  const props: Atoms = {
    position: 'absolute',
    [side]: size === 'medium' ? 4 : 5,
  }
  return props
}
