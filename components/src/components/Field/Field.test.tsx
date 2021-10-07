import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Field } from './Field'

describe('<Field />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Field label="Foo bar baz">
        <div />
      </Field>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
