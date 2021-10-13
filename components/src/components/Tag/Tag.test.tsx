import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Tag } from './Tag'

describe('<Tag />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Tag>10 ETH</Tag>)
    expect(screen.getByText(/eth/i)).toBeInTheDocument()
  })
})
