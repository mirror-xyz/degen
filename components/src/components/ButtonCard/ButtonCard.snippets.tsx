import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { ButtonCard } from './ButtonCard'
import { IconExclamationCircle } from '../icons/generated/IconExclamationCircle'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <ButtonCard
        buttonText="Connect"
        prefix={<IconExclamationCircle color="accent" />}
      >
        Connect your wallet.
      </ButtonCard>
    ),
  },
]
