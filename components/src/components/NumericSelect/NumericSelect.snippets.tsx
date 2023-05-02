import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { NumericSelect } from './NumericSelect'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <NumericSelect count={1} max={5} onChange={() => null} />,
  },
]
