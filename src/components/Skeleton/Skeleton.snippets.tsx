import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Skeleton, SkeletonGroup } from './Skeleton'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Skeleton loading>
        <Button>Basic</Button>
      </Skeleton>
    ),
  },
  {
    name: 'Group',
    code: (
      <SkeletonGroup loading>
        <Stack>
          <Skeleton>
            <Button>Group</Button>
          </Skeleton>
          <Skeleton>
            <Button>Group</Button>
          </Skeleton>
        </Stack>
      </SkeletonGroup>
    ),
  },
]
