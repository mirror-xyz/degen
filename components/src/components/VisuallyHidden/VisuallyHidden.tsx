import * as React from 'react'

import { Box } from '../Box'
import * as styles from './styles.css'

type Props = {
  as?: 'div' | 'span'
}

export const VisuallyHidden = ({
  as = 'div',
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Box
      as={as}
      borderWidth="0"
      className={styles.root}
      height="px"
      margin="-px"
      overflow="hidden"
      padding="0"
      position="absolute"
      whiteSpace="nowrap"
      width="px"
    >
      {children}
    </Box>
  )
}
