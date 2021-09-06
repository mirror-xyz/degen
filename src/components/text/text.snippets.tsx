import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Text } from './text'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Text>Foo Bar Baz</Text>,
  },
  {
    name: 'Title',
    code: <Text variant="title">Foo Bar Baz</Text>,
  },
  {
    name: 'Description',
    code: <Text variant="description">Foo Bar Baz</Text>,
  },
]
