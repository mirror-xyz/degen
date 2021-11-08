import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { AvatarGroup } from './AvatarGroup'

describe('<AvatarGroup />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
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
      />,
    )
    expect(screen.getAllByRole(/img/i).length).toBe(3)
  })
})
