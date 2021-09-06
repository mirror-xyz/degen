import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Spinner } from '../spinner'

describe('<Spinner />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Spinner accessibilityLabel="Loading…" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
