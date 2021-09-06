import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Spinner } from './spinner'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Spinner />,
  },
  {
    name: 'Large',
    code: <Spinner variant="lg" />,
  },
]
