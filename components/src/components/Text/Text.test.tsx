import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Text } from './Text'

describe('<Text />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Text>foo bar baz</Text>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
