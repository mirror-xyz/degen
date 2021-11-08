import { useTheme } from 'degen/components'
import { vars } from 'degen/css'

import { usePlayroomStore } from './PlayroomState'

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
    vars,
    avatarUrl:
      'https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png',
  }
}

export default useScope
