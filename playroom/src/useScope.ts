import { useTheme } from 'degen/components'
import { vars } from 'degen/css'

import { usePlayroomStore } from './PlayroomState'

export const avatars = {
  noun2:
    'https://images.mirror-media.xyz/publication-images/fHy5DSiGF6RZg8MYo3y_P.png',
  noun3:
    'https://images.mirror-media.xyz/publication-images/qmqVLl7GHPj4xfXRj21H-.png',
  noun11:
    'https://images.mirror-media.xyz/publication-images/9yZxF2aqRVvtb6xvYDOjs.png',
  noun17:
    'https://images.mirror-media.xyz/publication-images/DHNSNObmLOGtxjcluR7w2.png',
  noun97:
    'https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png',
  noun102:
    'https://images.mirror-media.xyz/publication-images/ncbsh8OPR_VdkRhGSljJD.png',
}

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
    vars,
    avatars,
  }
}

export default useScope
