import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { ProgressBar } from './ProgressBar'

describe('<ProgressBar />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ProgressBar goal={15} label="Crowdfund progress" value={10} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
