import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { useTheme } from '../ThemeProvider'
import * as styles from './styles.css'

type Props = {
  as?: BoxProps['as']
  padding?: BoxProps['padding']
  width?: BoxProps['width']
}

export const Card = ({
  as = 'div',
  children,
  padding,
  width,
}: React.PropsWithChildren<Props>) => {
  const { mode } = useTheme()
  return (
    <Box
      as={as}
      className={styles.variants({ dark: mode === 'dark' })}
      padding={padding}
      width={width}
    >
      {children}
    </Box>
  )
}
