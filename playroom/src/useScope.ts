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

export const nouns = [
  { label: 'Pineapple', avatar: avatars.noun2, value: 2 },
  { label: 'Wolf', avatar: avatars.noun3, value: 3 },
  { label: 'Party', avatar: avatars.noun11, value: 11 },
  { label: 'Pumpkin', avatar: avatars.noun17, value: 17 },
  { label: 'Alligator', avatar: avatars.noun97, value: 97 },
  { label: 'Coelacanth', avatar: avatars.noun102, value: 102 },
]

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
    vars,
    avatars,
    nouns,
  }
}

export default useScope
