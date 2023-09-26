import * as React from 'react'
import { default as NextImage } from 'next/image'
import { default as NextLink } from 'next/link'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import * as Components from 'degen/components'
import { Box, Button, Stack, Text, useTheme } from 'degen/components'
import { vars } from 'degen/css'

import { CopyButton } from '../CopyButton'
import './styles.css'

export type Props = {
  backgroundColor?: Components.BoxProps['backgroundColor']
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

export const avatars = {
  noun2:
    'https://images.mirror-media.xyz/publication-images/fHy5DSiGF6RZg8MYo3y_P.png',
  noun3:
    'https://images.mirror-media.xyz/publication-images/qmqVLl7GHPj4xfXRj21H-.png',
  noun11:
    'https://images.mirror-media.xyz/publication-images/9yZxF2aqRVvtb6xvYDOjs.png',
  noun17:
    'https://images.mirror-media.xyz/publication-images/DHNSNObmLOGtxjcluR7w2.png',
  noun97:
    'https://images.mirror-media.xyz/publication-images/H-zIoEYWk4SpFkljJiwB9.png',
  noun102:
    'https://images.mirror-media.xyz/publication-images/ncbsh8OPR_VdkRhGSljJD.png',
}

export const CodePreview = ({
  backgroundColor = 'background',
  code,
  expand = false,
  theme,
}: Props) => {
  const previewRef = React.useRef<HTMLElement>(null)
  const [state, setState] = React.useState<State>({
    ...initialState,
    expand,
  })
  const themeValue = useTheme()

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{
        mdx,
        ...Components,
        ...themeValue,
        previewRef,
        vars,
        NextImage,
        NextLink,
        avatars,
      }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
    >
      <Box
        backgroundColor="background"
        borderColor="foregroundSecondary"
        borderRadius="2xLarge"
        borderWidth="2px"
        overflow="hidden"
      >
        <Box
          backgroundColor={backgroundColor}
          borderBottomRadius={state.expand ? undefined : '2xLarge'}
          borderTopRadius="2xLarge"
          overflow="scroll"
          padding="24px"
          ref={previewRef}
        >
          <LivePreview />

          <Text color="red" font="mono">
            <LiveError
              style={{
                fontFamily: 'inherit',
                margin: 0,
              }}
            />
          </Text>
        </Box>

        {state.expand && (
          <Box position="relative">
            <LiveEditor />

            <Box position="absolute" right="14px" top="14px">
              <CopyButton content={code} />
            </Box>
          </Box>
        )}
      </Box>

      <Box marginY="8px">
        <Stack direction="horizontal" justify="flex-end" space="8px">
          <Button
            size="small"
            variant="transparent"
            onClick={() => setState((x) => ({ ...x, expand: !x.expand }))}
          >
            {state.expand ? 'Hide Code' : 'View Code'}
          </Button>
        </Stack>
      </Box>
    </LiveProvider>
  )
}
