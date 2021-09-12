import * as React from 'react'

import { Box, BoxProps } from '../Box'

export const validStackComponents = ['div', 'ol', 'ul'] as const

type Props = {
  as?: typeof validStackComponents[number]
  space?: BoxProps['gap']
}

export const Stack = ({
  as = 'div',
  children,
  space = 4,
}: React.PropsWithChildren<Props>) => {
  return (
    <Box as={as} display="flex" gap={space}>
      {children}
    </Box>
  )
}
