import * as React from 'react'
import '@storybook/addon-console'
import { Story } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'

import { default as FrameComponent } from '../src/playroom/FrameComponent'
import { useTheme } from '../src'

const StoryWrapper = ({ children }: { children?: React.ReactNode }) => {
  const isDarkMode = useDarkMode()
  const { setMode } = useTheme()

  React.useEffect(() => {
    setMode(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode, setMode])

  return <>{children}</>
}

export const decorators = [
  (Story: Story) => (
    <FrameComponent>
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    </FrameComponent>
  ),
]

export const parameters = {
  backgrounds: {
    default: 'dark',
  },
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [],
      locales: '',
    },
  },
}
