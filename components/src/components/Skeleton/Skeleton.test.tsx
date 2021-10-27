import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Skeleton } from './Skeleton'

describe('<Skeleton />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Skeleton loading>foo bar baz</Skeleton>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
