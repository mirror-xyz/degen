import * as React from 'react'

import { OptionalResponsiveObject, OptionalResponsiveValue } from '../../css'
import { ReactNodeNoStrings } from '../../types'
import { Box, BoxProps } from '../Box'
import { Direction, directionToFlexDirection, wrapToFlexWrap } from './utils'

export const validStackComponents = [
  'a',
  'article',
  'div',
  'form',
  'header',
  'label',
  'li',
  'main',
  'section',
  'span',
] as const

type Props = {
  as?: typeof validStackComponents[number]
  align?: BoxProps['alignItems']
  children: ReactNodeNoStrings
  direction?: OptionalResponsiveValue<Direction>
  flex?: BoxProps['flex']
  justify?: BoxProps['justifyContent']
  space?: BoxProps['gap']
  wrap?: OptionalResponsiveObject<true | false>
}

export const Stack = ({
  as = 'div',
  align,
  children,
  justify,
  flex,
  direction = 'vertical',
  space = '4',
  wrap,
}: React.PropsWithChildren<Props>) => {
  const flexDirection = directionToFlexDirection(direction)
  const flexWrap = wrapToFlexWrap(wrap)
  return (
    <Box
      alignItems={align}
      as={as}
      display="flex"
      flex={flex}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      gap={space}
      justifyContent={justify}
    >
      {children}
    </Box>
  )
}
