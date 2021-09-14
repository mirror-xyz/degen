import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Skeleton, SkeletonGroup } from './Skeleton'

describe('<Skeleton />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Skeleton>foo bar baz</Skeleton>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})

describe('<SkeletonGroup />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <SkeletonGroup>
        <Skeleton>foo bar baz</Skeleton>
        <Skeleton>quick brown fox</Skeleton>
      </SkeletonGroup>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
