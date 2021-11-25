import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { Dialog } from './Dialog'
import { Box } from '../Box'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Dialog
        open
        title="Welcome"
        onClose={() => {
          console.log('close')
        }}
      >
        <Box
          backgroundColor="foregroundSecondary"
          borderRadius="2xLarge"
          height="36"
          width="full"
        />
      </Dialog>
    ),
  },
]
