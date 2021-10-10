import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { ThemeProvider } from './ThemeProvider'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <ThemeProvider>
        <div />
      </ThemeProvider>
    ),
  },
]
