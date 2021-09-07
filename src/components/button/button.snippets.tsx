import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Button } from './button'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Button>Basic</Button>,
  },
  {
    name: 'Disabled',
    code: <Button disabled>Disabled</Button>,
  },
  {
    name: 'Size',
    code: <Button size="sm">Size</Button>,
  },
  {
    name: 'Variant',
    code: <Button variant="highlight">Variant</Button>,
  },
]
