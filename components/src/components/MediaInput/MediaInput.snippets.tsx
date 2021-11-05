import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { MediaInput } from './MediaInput'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <MediaInput label="Choose or drag and drop an image" />,
  },
]
