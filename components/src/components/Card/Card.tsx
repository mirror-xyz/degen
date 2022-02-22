import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { useTheme } from '../ThemeProvider'
import * as styles from './styles.css'

type Props = {
  as?: BoxProps['as']
  shadow?: boolean
  hover?: boolean
  level?: '1' | '2'
  borderRadius?: BoxProps['borderRadius']
  padding?: BoxProps['padding']
  width?: BoxProps['width']
}

export const Card = ({
  as = 'div',
  children,
  padding,
  shadow,
  level = '1',
  hover,
  borderRadius = { xs: '2xLarge', sm: '3xLarge' },
  width,
}: React.PropsWithChildren<Props>) => {
  const { mode, forcedMode } = useTheme()
  return (
    <Box
      as={as}
      borderRadius={borderRadius}
      className={styles.variants({
        dark: (forcedMode ?? mode) === 'dark',
        level,
        shadow,
        hover,
      })}
      padding={padding}
      width={width}
    >
      {children}
    </Box>
  )
}
