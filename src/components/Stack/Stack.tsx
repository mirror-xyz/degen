import * as React from 'react'

import { OptionalResponsiveObject, OptionalResponsiveValue } from '~/theme'

import { Box, BoxProps } from '../Box'
import { Direction, directionToFlexDirection, wrapToFlexWrap } from './utils'

export const validStackComponents = ['div', 'ol', 'ul'] as const

type Props = {
  as?: typeof validStackComponents[number]
  direction?: OptionalResponsiveValue<Direction>
  space?: BoxProps['gap']
  wrap?: OptionalResponsiveObject<true | false>
}

export const Stack = ({
  as = 'div',
  children,
  direction = 'horizontal',
  space = 4,
  wrap,
}: React.PropsWithChildren<Props>) => {
  const flexDirection = directionToFlexDirection(direction)
  const flexWrap = wrapToFlexWrap(wrap)
  return (
    <Box
      as={as}
      display="flex"
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      gap={space}
    >
      {children}
    </Box>
  )
}

Stack.displayName = 'Stack'
