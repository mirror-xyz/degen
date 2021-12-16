import * as React from 'react'

import { Box, IconSearch, Input, Stack, Text } from 'degen/components'
import * as Components from 'degen/components'

import { Link } from '~/components'

const icons = Object.entries(Components)
  .filter(([k]) => k.includes('Icon'))
  .map(([name, Component]) => ({ name, Component }))
  .sort((a, b) => (a.name > b.name ? 1 : -1))

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
    <Stack space="8">
      <Input
        hideLabel
        label="Search icons"
        placeholder="Search icons"
        prefix={<IconSearch />}
        value={state.query}
        onChange={(event) =>
          setState((x) => ({ ...x, query: event.target.value }))
        }
      />

      <Stack direction="horizontal" space={{ xs: '4', md: '6' }} wrap>
        {filteredIcons.map((x) => (
          <Link href={`/components/${x.name}`} key={x.name}>
            <Box>
              <Stack align="center" space="2">
                <Box
                  backgroundColor="foregroundTertiary"
                  borderRadius="large"
                  boxShadow={{ base: '1', hover: '1', active: '0.5' }}
                  boxShadowColor={{
                    base: 'transparent',
                  }}
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
                <Text align="center" color="text" size="label">
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
