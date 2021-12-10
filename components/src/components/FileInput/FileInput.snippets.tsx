import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { FileInput } from './FileInput'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <FileInput>
        {(context) => (context.name ? <div>{context.name}</div> : <div />)}
      </FileInput>
    ),
  },
]
