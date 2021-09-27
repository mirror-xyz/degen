import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Skeleton, SkeletonGroup } from './Skeleton'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Skeleton loading>
        <></>
      </Skeleton>
    ),
  },
  {
    name: 'Group',
    code: (
      <SkeletonGroup loading>
        <></>
      </SkeletonGroup>
    ),
  },
]
