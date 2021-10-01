import * as React from 'react'

import { Atoms } from '~/theme'
import { Box } from '../Box'
import * as styles from './styles.css'

const resolveDefaultComponent = {
  '1': 'h1',
  '2': 'h2',
} as const

type Props = {
  align?: Atoms['textAlign']
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: React.ReactNode
  color?: Atoms['color']
  id?: string
} & styles.Variants

export const Heading = ({
  align,
  as,
  children,
  color = 'foreground',
  id,
  level = '2',
}: Props) => {
  return (
    <Box
      as={as ?? resolveDefaultComponent[level]}
      className={styles.variants({
        level,
      })}
      color={color}
      fontFamily="sans"
      id={id}
      textAlign={align}
    >
      {children}
    </Box>
  )
}

Heading.displayName = 'Heading'
