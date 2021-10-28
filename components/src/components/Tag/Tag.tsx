import * as React from 'react'

import { Box } from '../Box'
import * as styles from './styles.css'

type Props = {
  label?: string
} & styles.Variants

export const Tag = ({
  children,
  hover,
  label,
  size = 'medium',
  tone = 'neutral',
}: React.PropsWithChildren<Props>) => {
  return (
    <Box className={styles.variants({ hover, size, tone })}>
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
      <Box paddingX="2">{children}</Box>
    </Box>
  )
}
