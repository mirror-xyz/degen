import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Spinner } from './Spinner'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Spinner />,
  },
  {
    name: 'Size',
    code: <Spinner size="lg" />,
  },
]
