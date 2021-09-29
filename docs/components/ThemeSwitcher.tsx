import { Box, Button, Stack, useTheme } from '~/components'

export const ThemeSwitcher = () => {
  const { accent, mode } = useTheme()
  return (
    <Box>
      <Stack>
        <Button size="md" variant="transparentSecondary">
          {mode}
        </Button>
        <Button size="md" variant="transparentSecondary">
          {accent}
        </Button>
      </Stack>
    </Box>
  )
}
