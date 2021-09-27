import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { VisuallyHidden } from './VisuallyHidden'

describe('<VisuallyHidden />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<VisuallyHidden>foo bar baz</VisuallyHidden>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
