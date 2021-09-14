import * as React from 'react'

import { cleanup, render, screen, testA11y } from '@/test'

import { Button } from './Button'

describe('<Text />', () => {
  afterEach(cleanup)

  it('passes a11y', async () => {
    await testA11y(<Button>foo bar baz</Button>)
  })

  it('renders', () => {
    render(<Button>foo bar baz</Button>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
