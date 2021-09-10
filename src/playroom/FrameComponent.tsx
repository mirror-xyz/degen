import * as React from 'react'

import { ThemeProps, ThemeProvider } from '~/theme'
import { Box } from '~/components'

import './styles.css'

type Props = {
  children: React.ReactNode
  theme?: ThemeProps['defaultMode']
}

const FrameComponent = ({ children, theme }: Props) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <ThemeProvider defaultMode={theme}>
      <Box bg="background" minHeight="viewHeight">
        {children}
      </Box>
    </ThemeProvider>
  </>
)

export default FrameComponent
