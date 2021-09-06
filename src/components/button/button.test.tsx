import * as React from 'react'

import { cleanup, render, screen, testA11y } from '@/test'

import { Button } from './button'

describe('<Button />', () => {
  afterEach(cleanup)

  it('passes a11y', async () => {
    await testA11y(<Button>foo bar baz</Button>)
  })

  it('renders', () => {
    render(<Button>foo bar baz</Button>)
    expect(screen.getByRole(/button/i)).toBeInTheDocument()
  })
})
