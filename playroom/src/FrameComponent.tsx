import * as React from 'react'

import { Box, ThemeProvider } from '~/components'
import { PlayroomStateProvider } from './PlayroomState'

import './styles.css'

type ThemeProviderProps = Parameters<typeof ThemeProvider>[0]

type Props = {
  theme?: ThemeProviderProps['defaultMode']
}

const FrameComponent = ({
  children,
  theme,
}: React.PropsWithChildren<Props>) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <PlayroomStateProvider>
      <ThemeProvider forcedMode={theme}>
        <Box backgroundColor="background" minHeight="viewHeight">
          {children}
        </Box>
      </ThemeProvider>
    </PlayroomStateProvider>
  </>
)

export default FrameComponent
