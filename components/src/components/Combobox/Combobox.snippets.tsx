import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Combobox } from './Combobox'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Combobox />,
  },
]