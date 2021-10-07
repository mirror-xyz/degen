import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { TextInput } from './TextInput'

describe('<TextInput />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<TextInput label="Foo bar baz" />)
    expect(screen.getByRole(/textbox/i)).toBeInTheDocument()
  })
})
