import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { ThemeProvider } from './'

describe('<ThemeProvider />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ThemeProvider>foo bar baz</ThemeProvider>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
