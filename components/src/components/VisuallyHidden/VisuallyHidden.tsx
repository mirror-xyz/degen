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
      borderWidth="0px"
      className={styles.root}
      height="1px"
      margin="-1px"
      overflow="hidden"
      padding="0px"
      position="absolute"
      whiteSpace="nowrap"
      width="1px"
    >
      {children}
    </Box>
  )
}
