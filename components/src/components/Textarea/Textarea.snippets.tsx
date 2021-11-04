import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Textarea } from './Textarea'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Textarea label="Label" />,
  },
]
