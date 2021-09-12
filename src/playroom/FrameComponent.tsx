import * as React from 'react'

import { ThemeProvider, ThemeProviderProps } from '~/theme'
import { Box } from '~/components'
import { PlayroomStateProvider } from './PlayroomState'

import './styles.css'

type Props = {
  children: React.ReactNode
  theme?: ThemeProviderProps['defaultMode']
}

const FrameComponent = ({ children, theme }: Props) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <PlayroomStateProvider>
      <ThemeProvider defaultMode={theme} disableTransitionOnChange>
        <Box backgroundColor="background" minHeight="viewHeight">
          {children}
        </Box>
      </ThemeProvider>
    </PlayroomStateProvider>
  </>
)

export default FrameComponent
