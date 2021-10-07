import * as React from 'react'

import { Link } from 'components'

import { Box, IconSearch, Stack, Text, TextInput } from '~/components'
import * as Components from '~/components'

const icons = Object.entries(Components)
  .filter(([k]) => k.includes('Icon'))
  .map(([name, Component]) => ({ name, Component }))

type State = {
  query: string
}

const initialState: State = {
  query: '',
}

export const SearchIcons = () => {
  const [state, setState] = React.useState<State>(initialState)

  const filteredIcons = React.useMemo(() => {
    if (!state.query?.length) return icons
    return icons.filter((x) =>
      x.name.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  return (
    <Stack direction="vertical" space="8">
      <TextInput
        hideLabel
        icon={<IconSearch />}
        label="Search icons"
        placeholder="Search icons"
        value={state.query}
        onChange={(event) =>
          setState((x) => ({ ...x, query: event.target.value }))
        }
      />

      <Stack space={{ xs: '4', md: '6' }} wrap>
        {filteredIcons.map((x) => (
          <Link href={`/components/${x.name}`} key={x.name}>
            <Box width={{ xs: '20', md: '24' }}>
              <Stack align="center" direction="vertical" space="2">
                <Box
                  backgroundColor="foregroundTertiary"
                  borderRadius="2"
                  boxShadow={{ base: '1', hover: '1', active: '0.5' }}
                  boxShadowColor={{ base: 'background' }}
                  color="foreground"
                  padding="4"
                  transitionDuration="150"
                  transitionProperty="shadow"
                  transitionTimingFunction="inOut"
                  width="max"
                >
                  {React.createElement(x.Component as any, {
                    size: { xs: '10', md: '12' },
                  })}
                </Box>
                <Text align="center" color="text" ellipsis size="label">
                  {x.name.replace('Icon', '')}
                </Text>
              </Stack>
            </Box>
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}
