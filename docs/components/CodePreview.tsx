import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  LiveProviderProps,
} from 'react-live'
import { mdx } from '@mdx-js/react'
import { createUrl } from 'playroom/utils'
import { PrismTheme } from 'prism-react-renderer'

import * as Components from '~/components'
import { Box } from '~/components'
import { Link } from './Link'

export type Props = {
  code: string
  live: boolean
  theme: PrismTheme
}

export const CodePreview = ({ code, live, theme }: Props) => {
  const providerProps: Pick<LiveProviderProps, 'transformCode' | 'scope'> = live
    ? {
        transformCode: (code) => '/** @jsx mdx */' + code,
        scope: { mdx, ...Components },
      }
    : {}

  return (
    <LiveProvider as="div" code={code} theme={theme} {...providerProps}>
      <Box backgroundColor="backgroundSecondary" borderRadius="lg" padding={4}>
        <LivePreview />
      </Box>

      {live && (
        <>
          <LiveError />
          <LiveEditor />
          <Box>
            <Link
              external
              href={createUrl({
                baseUrl: 'http://localhost:8082',
                code,
                widths: [640],
              })}
            >
              Playroom
            </Link>
          </Box>
        </>
      )}
    </LiveProvider>
  )
}
