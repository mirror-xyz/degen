import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Box } from '../Box'
import { Stack } from './Stack'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Stack>
        <Box backgroundColor="backgroundSecondary">Foo</Box>
        <Box backgroundColor="backgroundSecondary">Bar</Box>
      </Stack>
    ),
  },
]
