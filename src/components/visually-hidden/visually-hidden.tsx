import * as React from 'react'

import { Box } from '../box'
import { clip } from './styles.css'

type Props = {
  children: React.ReactNode
}

export const VisuallyHidden = ({ children }: Props) => {
  return (
    <Box
      borderWidth={0}
      className={clip}
      h="px"
      m="-px"
      overflow="hidden"
      p={0}
      position="absolute"
      w="px"
      whiteSpace="nowrap"
    >
      {children}
    </Box>
  )
}
