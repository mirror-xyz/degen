import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { AvatarGroup } from './AvatarGroup'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <AvatarGroup
        members={[
          {
            label: 'Noun 97',
            src: 'https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png',
          },
          {
            label: 'Noun 11',
            src: 'https://images.mirror-media.xyz/publication-images/9yZxF2aqRVvtb6xvYDOjs.png',
          },
          {
            label: 'Noun 3',
            src: 'https://images.mirror-media.xyz/publication-images/qmqVLl7GHPj4xfXRj21H-.png',
          },
        ]}
      />
    ),
  },
]
