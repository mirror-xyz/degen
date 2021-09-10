import * as React from 'react'

import { cleanup, render, screen, testA11y } from '@/test'

import { Box, createVariants } from './Box'

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

describe('createVariants', () => {
  afterEach(cleanup)

  it('creates variant', () => {
    const variants = createVariants({
      base: {
        color: 'foreground',
      },
      description: {
        color: 'textTertiary',
      },
    })
    expect(variants.base.color).toEqual('foreground')
    expect(variants.description.color).toEqual('textTertiary')
  })

  it('creates responsive variant', () => {
    const variants = createVariants({
      title: {
        fontSize: { sm: '3xl', md: '4xl', lg: '5xl' },
      },
    })
    expect(variants.title.fontSize).toEqual({ sm: '3xl', md: '4xl', lg: '5xl' })
  })
})
