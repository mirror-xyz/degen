import * as React from 'react'

import { ThemeProvider, ThemeProviderProps } from '~/theme'
import { Box } from '~/components'

import './styles.css'

type Props = {
  children: React.ReactNode
  theme?: ThemeProviderProps['defaultMode']
}

const FrameComponent = ({ children, theme }: Props) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <ThemeProvider defaultMode={theme}>
      <Box backgroundColor="background" minHeight="viewHeight">
        {children}
      </Box>
    </ThemeProvider>
  </>
)

export default FrameComponent
