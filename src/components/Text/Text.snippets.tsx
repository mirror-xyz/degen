import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Text } from './Text'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Text>Basic</Text>,
  },
  {
    name: 'Variant',
    code: <Text variant="title">Title</Text>,
  },
]
