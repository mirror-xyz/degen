import * as React from 'react'

import { Box, Stack, Text } from '~/components'
import { vars } from '~/theme'

type Props = {
  type: 'accent' | 'functional'
}

export const ColorPalette = ({ type }: Props) => {
  const colors = React.useMemo(() => {
    const base = Object.entries(vars.colors)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1))

    const colors = []
    for (const color of base) {
      const name = color.name
      if (['black', 'current', 'inherit', 'transparent'].includes(name))
        continue

      const isFunctional =
        name.startsWith('background') ||
        name.startsWith('foreground') ||
        name.startsWith('group') ||
        name.startsWith('text')

      if (type === 'accent' && !isFunctional) colors.push(color)
      if (type === 'functional' && isFunctional) colors.push(color)
    }

    return colors
  }, [type])

  return (
    <Box marginBottom="14">
      <Stack direction="vertical">
        {colors.map((y) => (
          <Box
            backgroundColor="foregroundTertiary"
            borderRadius="2"
            key={y.name}
            paddingX="5"
            paddingY="4"
          >
            <Stack
              align={{ xl: 'center' }}
              direction={{ xs: 'vertical', xl: 'horizontal' }}
              space={{ xs: '4', xl: '6' }}
            >
              <Box backgroundColor="background" borderRadius="2">
                <Box
                  backgroundColor={y.name as any}
                  borderRadius="2"
                  padding="8"
                />
              </Box>

              <Stack direction="vertical" space="1.5">
                <Text weight="medium">{y.name}</Text>
                <Text font="mono" size="small">
                  {y.value}
                </Text>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
