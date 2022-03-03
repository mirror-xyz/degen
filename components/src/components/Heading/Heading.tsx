import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

const resolveDefaultComponent = {
  '1': 'h1',
  '2': 'h2',
} as const

type Props = {
  align?: BoxProps['textAlign']
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend'
  children?: React.ReactNode
  color?: BoxProps['color']
  id?: string
  transform?: BoxProps['textTransform']
  responsive?: boolean
  wordBreak?: BoxProps['wordBreak']
} & styles.Variants

export const Heading = ({
  align,
  as,
  children,
  color = 'foreground',
  id,
  level = '2',
  responsive,
  transform,
  wordBreak,
}: Props) => {
  return (
    <Box
      as={as ?? resolveDefaultComponent[level]}
      className={styles.variants({
        level,
        responsive,
      })}
      color={color}
      fontFamily="sans"
      id={id}
      textAlign={align}
      textTransform={transform}
      wordBreak={wordBreak}
    >
      {children}
    </Box>
  )
}
