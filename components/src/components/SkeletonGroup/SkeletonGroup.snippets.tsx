import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Skeleton } from '../Skeleton'
import { SkeletonGroup } from './SkeletonGroup'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <SkeletonGroup loading>
        <Skeleton>_</Skeleton>
      </SkeletonGroup>
    ),
  },
]
