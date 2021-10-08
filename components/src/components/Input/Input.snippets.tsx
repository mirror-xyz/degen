import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Input } from './Input'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Input label="Label" />,
  },
]
