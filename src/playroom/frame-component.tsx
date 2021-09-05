import * as React from 'react'

import { Box, ThemeProvider } from '~/components'
import { Theme } from '~/styles/tokens'

import '~/styles/global.css'

type Props = {
  children: React.ReactNode
  theme: Theme
}

const FrameComponent = ({ children, theme }: Props) => (
  <ThemeProvider defaultTheme={theme}>
    <Box background="background" minHeight="screenHeight">
      {children}
    </Box>
  </ThemeProvider>
)

export default FrameComponent
