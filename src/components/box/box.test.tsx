import * as React from 'react'

import { cleanup, render, screen, testA11y } from '@/test'

import { Box } from './box'

describe('<Box />', () => {
  afterEach(cleanup)

  it('passes a11y', async () => {
    await testA11y(<Box>foo bar baz</Box>)
  })

  it('renders', () => {
    render(<Box>foo bar baz</Box>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
