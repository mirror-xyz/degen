import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live'
import { mdx } from '@mdx-js/react'
import { createUrl } from 'playroom/utils'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import * as Components from '~/components'
import { Box, useTheme } from '~/components'

export type Props = {
  code: string
  live: boolean
}

export const CodePreview = ({ code, live }: Props) => {
  const { mode, setMode } = useTheme()
  const playroomUrl = createUrl({ baseUrl: 'localhost:8082', code })
  const theme = mode === 'light' ? vsLight : vsDark
  console.log(playroomUrl, mode)

  const providerProps: Pick<LiveProviderProps, 'transformCode' | 'scope'> = live
    ? {
        transformCode: (code) => '/** @jsx mdx */' + code,
        scope: { mdx, ...Components },
      }
    : {}

  return (
    <LiveProvider code={code} theme={theme} {...providerProps}>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        toggle theme
      </button>
      <Box backgroundColor="backgroundSecondary" borderRadius="lg" padding={4}>
        <LivePreview />
      </Box>

      {live && (
        <>
          <LiveEditor />
          <LiveError />
        </>
      )}
    </LiveProvider>
  )
}
