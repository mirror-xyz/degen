import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Button } from './Button'

describe('<Button />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Button>Connect Wallet</Button>)
    expect(screen.getByText(/connect/i)).toBeInTheDocument()
  })
})
