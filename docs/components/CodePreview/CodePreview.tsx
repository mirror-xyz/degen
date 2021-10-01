import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import { createPlayroomLink } from 'utils/playroom'

import * as Components from '~/components'
import { Box, Button, Stack, Text } from '~/components'
import { usePlayroomStore } from '../../../playroom/src/PlayroomState'
import { CopyButton } from '../CopyButton'
import { Link } from '../Link'

import './styles.css'

export type Props = {
  code: string
  expand?: boolean
  theme?: PrismTheme
}

type State = {
  expand: boolean
}

const initialState = {
  expand: false,
}

export const CodePreview = ({ code, expand = false, theme }: Props) => {
  const [state, setState] = React.useState<State>({
    ...initialState,
    expand,
  })
  const store = usePlayroomStore()

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{ mdx, ...Components, ...store }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
    >
      <Box
        borderColor="foregroundSecondary"
        borderRadius="2"
        borderWidth="0.5"
        overflow="hidden"
      >
        <Box padding="6">
          <LivePreview />

          <Text color="red">
            <LiveError style={{ margin: 0 }} />
          </Text>
        </Box>
        {state.expand && (
          <Box position="relative">
            <LiveEditor />

            <Box position="absolute" right="3.5" top="3.5">
              <CopyButton content={code} />
            </Box>
          </Box>
        )}
      </Box>

      <Box marginY="2">
        <Stack justify="flex-end" space="2">
          <Button
            size="medium"
            variant="transparentSecondary"
            onClick={() => setState((x) => ({ ...x, expand: !x.expand }))}
          >
            {state.expand ? 'Hide Code' : 'View Code'}
          </Button>

          <Link href={createPlayroomLink({ code })}>
            <Button size="medium" variant="transparentSecondary">
              Open in Playroom
            </Button>
          </Link>
        </Stack>
      </Box>
    </LiveProvider>
  )
}
