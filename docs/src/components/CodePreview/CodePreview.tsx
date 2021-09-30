import * as React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import { createPlayroomLink } from 'src/utils/playroom'

import * as Components from '~/components'
import { Box, Button, Stack, Text } from '~/components'
import { CopyButton } from '../CopyButton'
import { Link } from '../Link'

import './styles.css'

export type Props = {
  code: string
  theme: PrismTheme
}

type State = {
  expanded: boolean
}

const initialState = {
  expanded: false,
}

export const CodePreview = ({ code, theme }: Props) => {
  const [state, setState] = React.useState<State>(initialState)

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{ mdx, ...Components }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
    >
      <Box
        borderColor="foregroundSecondary"
        borderRadius="lg"
        borderWidth="2"
        overflow="hidden"
      >
        <Box padding="6">
          <LivePreview />

          <Text color="red">
            <LiveError style={{ margin: 0 }} />
          </Text>
        </Box>
        {state.expanded && (
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
            size="md"
            variant="transparentSecondary"
            onClick={() => setState((x) => ({ ...x, expanded: !x.expanded }))}
          >
            {state.expanded ? 'Hide Code' : 'View Code'}
          </Button>

          <Link href={createPlayroomLink({ code })}>
            <Button size="md" variant="transparentSecondary">
              Open in Playroom
            </Button>
          </Link>
        </Stack>
      </Box>
    </LiveProvider>
  )
}
