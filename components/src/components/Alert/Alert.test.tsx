import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Alert } from './Alert'

describe('<Alert />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Alert />)
    expect(screen.getByRole(/alert/i)).toBeInTheDocument()
  })
})
