import * as React from 'react'

import { Accent } from 'degen/tokens'
import {
  Box,
  Button,
  Skeleton,
  SkeletonGroup,
  Stack,
  useTheme,
} from 'degen/components'

import { setThemeAccent, setThemeMode } from '~/utils/cookies'
import { useIsMounted } from '~/utils/isMounted'

export const ThemeSwitcher = () => {
  // Theme doesn't resolve from localStorage until mounted
  // Show skeletons to avoid hydration mismatch error
  const isMounted = useIsMounted()
  const { accent, mode, setMode, setAccent } = useTheme()

  const toggleMode = React.useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
  }, [mode, setMode])

  const toggleAccent = React.useCallback(() => {
    const nextAccent = getNextAccent(accent)
    setAccent(nextAccent)
    setThemeAccent(nextAccent)
  }, [accent, setAccent])

  return (
    <SkeletonGroup loading={!isMounted}>
      <Stack direction="horizontal" space="3">
        <Skeleton backgroundColor="foregroundTertiary">
          <Button size="small" variant="tertiary" onClick={toggleMode}>
            <Box textTransform="capitalize">{isMounted ? mode : 'light'}</Box>
          </Button>
        </Skeleton>

        <Skeleton backgroundColor="foregroundTertiary">
          <Button size="small" variant="tertiary" onClick={toggleAccent}>
            <Box textTransform="capitalize">{isMounted ? accent : 'blue'}</Box>
          </Button>
        </Skeleton>
      </Stack>
    </SkeletonGroup>
  )
}

const getNextAccent = (
  accent: Accent | 'foreground',
): Accent | 'foreground' => {
  switch (accent) {
    case 'blue':
      return 'green'
    case 'green':
      return 'indigo'
    case 'indigo':
      return 'orange'
    case 'orange':
      return 'pink'
    case 'pink':
      return 'purple'
    case 'purple':
      return 'red'
    case 'red':
      return 'teal'
    case 'teal':
      return 'yellow'
    case 'yellow':
      return 'foreground'
    case 'foreground':
      return 'blue'
  }
}
