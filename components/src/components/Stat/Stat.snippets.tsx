import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Stat } from './Stat'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Stat label="Current time" meta="Pacific Standard Time" value="12:01am" />
    ),
  },
]
