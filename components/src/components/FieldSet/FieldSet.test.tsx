import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { FieldSet } from './FieldSet'

describe('<FieldSet />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <FieldSet legend="Token">
        <div />
      </FieldSet>,
    )
    expect(screen.getByText(/token/i)).toBeInTheDocument()
  })
})
