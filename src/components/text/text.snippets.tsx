import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Text } from './text'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Text>Basic</Text>,
  },
  {
    name: 'Title',
    code: <Text variant="title">Title</Text>,
  },
  {
    name: 'Description',
    code: <Text variant="description">Description</Text>,
  },
]
