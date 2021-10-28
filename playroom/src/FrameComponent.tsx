import * as React from 'react'

import { ThemeProvider } from 'degen/components'

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
      <ThemeProvider defaultMode={theme}>{children}</ThemeProvider>
    </PlayroomStateProvider>
  </>
)

export default FrameComponent
