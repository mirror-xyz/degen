import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Input } from './Input'

describe('<Input />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Input label="Foo bar baz" />)
    expect(screen.getByRole(/textbox/i)).toBeInTheDocument()
  })
})
