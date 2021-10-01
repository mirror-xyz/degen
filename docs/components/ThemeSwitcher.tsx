import * as React from 'react'

import { setThemeAccent, setThemeMode } from 'utils/cookies'

import { Accent } from '~/tokens'
import { Box, Button, Stack, useTheme } from '~/components'

export const ThemeSwitcher = () => {
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
    <Stack space="3">
      <Button size="md" variant="tertiary" onClick={toggleMode}>
        <Box textTransform="capitalize">{mode}</Box>
      </Button>
      <Button size="md" variant="tertiary" onClick={toggleAccent}>
        <Box textTransform="capitalize">{accent}</Box>
      </Button>
    </Stack>
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
