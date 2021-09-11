import * as React from 'react'

import { EmptyObject } from '~/types'
import { Box } from '../Box'

type Props = EmptyObject

export const Button = React.forwardRef(
  (
    { children }: React.PropsWithChildren<Props>,
    ref: React.Ref<HTMLElement>,
  ) => {
    return <Box ref={ref}>{children}</Box>
  },
)
