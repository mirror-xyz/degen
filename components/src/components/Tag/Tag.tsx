import * as React from 'react'

import { Box } from '../Box'
import * as styles from './styles.css'

export type Props = {
  as?: 'div' | 'span'
  label?: string
} & styles.Variants

export const Tag = ({
  as = 'div',
  children,
  hover,
  label,
  size = 'medium',
  tone = 'secondary',
}: React.PropsWithChildren<Props>) => {
  return (
    <Box
      as={as}
      className={styles.variants({ hover, size, tone })}
      lineHeight="normal"
    >
      {label && (
        <Box
          alignItems="center"
          as="label"
          borderRadius="full"
          className={styles.label}
          display="flex"
          height="full"
          paddingX="2"
        >
          <span>{label}</span>
        </Box>
      )}
      <Box as={as} paddingX="2">
        {children}
      </Box>
    </Box>
  )
}
