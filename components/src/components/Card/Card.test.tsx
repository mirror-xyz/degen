import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Card } from './Card'

describe('<Card />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Card>foo bar baz</Card>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
