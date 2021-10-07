import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { TextInput } from './TextInput'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <TextInput label="Name" max={100} name="name" type="number" />,
  },
]
