import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { ProgressBar } from './ProgressBar'

describe('<ProgressBar />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ProgressBar loading />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
