import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Box } from '../Box'
import { Stack } from './Stack'

describe('<Stack />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Stack>
        <Box>foo bar baz</Box>
      </Stack>,
    )
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })
})
