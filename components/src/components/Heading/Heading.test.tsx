import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Heading } from './Heading'

describe('<Heading />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Heading>foo bar baz</Heading>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
