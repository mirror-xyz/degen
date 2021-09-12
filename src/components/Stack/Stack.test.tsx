import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Stack } from './Stack'

describe('<Stack />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Stack>foo bar baz</Stack>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
