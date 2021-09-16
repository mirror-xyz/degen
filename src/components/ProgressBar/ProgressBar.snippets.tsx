import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { ProgressBar } from './ProgressBar'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <ProgressBar goal={15} label="Crowdfund progress" value={10} />,
  },
]
