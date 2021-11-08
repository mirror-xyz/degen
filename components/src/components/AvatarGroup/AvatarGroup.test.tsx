import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { AvatarGroup } from './AvatarGroup'

describe('<AvatarGroup />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<AvatarGroup />)
  })
})