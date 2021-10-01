import * as React from 'react'

import { Box, Heading, Stack, Text } from '~/components'
import { vars } from '~/theme'

export const ColorPalette = () => {
  const colors = React.useMemo(() => {
    const base = Object.entries(vars.colors)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1))

    const accent = []
    const functional = []
    for (const color of base) {
      const name = color.name
      if (['black', 'current', 'inherit', 'transparent'].includes(name))
        continue
      const isFunctional =
        name.startsWith('background') ||
        name.startsWith('foreground') ||
        name.startsWith('group') ||
        name.startsWith('text')
      if (isFunctional) functional.push(color)
      else accent.push(color)
    }

    return [
      { name: 'functional', colors: functional },
      { name: 'accent', colors: accent },
    ]
  }, [])

  return (
    <Stack direction="vertical" space="14">
      {colors.map((x) => (
        <Stack direction="vertical" key={x.name} space="8">
          <Box as="a" display="block" href={`#${x.name}`}>
            <Heading id={x.name} level="2" transform="capitalize">
              {x.name}
            </Heading>
          </Box>

          <Stack direction="vertical">
            {x.colors.map((y) => (
              <Box
                backgroundColor={y.name as any}
                borderRadius="2"
                key={y.name}
                paddingX="6"
                paddingY="8"
              >
                <Stack
                  direction={{ xs: 'vertical', xl: 'horizontal' }}
                  justify="space-between"
                >
                  <Text weight="medium">{y.name}</Text>
                  <Text font="mono" size="small">
                    {y.value}
                  </Text>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
