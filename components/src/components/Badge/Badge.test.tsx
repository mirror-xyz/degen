import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Badge } from './Badge'

describe('<Badge />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Badge>foo bar baz</Badge>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
