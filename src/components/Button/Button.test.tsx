import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Button } from './Button'

describe('<Text />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Button>foo bar baz</Button>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
