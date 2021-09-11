import * as React from 'react'

import { cleanup, render, screen, testA11y } from '@/test'

import { Text } from './Text'

describe('<Text />', () => {
  afterEach(cleanup)

  it('passes a11y', async () => {
    await testA11y(<Text>foo bar baz</Text>)
  })

  it('renders', () => {
    render(<Text>foo bar baz</Text>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
