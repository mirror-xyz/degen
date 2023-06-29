import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Avatar } from './Avatar'

describe('<Avatar />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Avatar
        label="Avatar"
        src="https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png"
      />,
    )
    expect(screen.getByRole(/img/i)).toBeInTheDocument()
  })
})
