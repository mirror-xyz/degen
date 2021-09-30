import * as React from 'react'
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import { vars } from '../../../components/src/theme'
import { Box, useTheme } from '../../../components/src'

import { CopyButton } from './CopyButton'
import type { Props as CodePreviewProps } from './CodePreview'

const CodePreview = dynamic<CodePreviewProps>(
  () => import('./CodePreview').then((mod) => mod.CodePreview),
  {
    loading: () => (
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="lg"
        height="48"
        width="full"
      />
    ),
  },
)

type Props = {
  children: string
  className: string
  live: boolean
}

export const CodeBlock = ({ children, className, live }: Props) => {
  const { mode } = useTheme()
  const theme = mode === 'light' ? vsLight : vsDark
  const modifiedTheme: PrismTheme = {
    ...theme,
    plain: {
      ...theme.plain,
      color: vars.colors.foreground,
      backgroundColor: vars.colors.backgroundSecondary,
    },
  }

  const code = children.trim()
  if (live) return <CodePreview code={code} theme={modifiedTheme} />

  const language = className?.replace(/language-/, '') as Language
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={modifiedTheme}
    >
      {/* eslint-disable react/no-array-index-key */}
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          as="pre"
          borderRadius="lg"
          className={className}
          padding="6"
          position="relative"
          style={style}
        >
          <Box position="absolute" right="3.5" top="3.5">
            <CopyButton content={code} />
          </Box>

          {tokens.map((line, i) => (
            <Box key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <Box
                  as="span"
                  fontFamily="mono"
                  fontSize="base"
                  key={key}
                  {...getTokenProps({ token, key })}
                />
              ))}
            </Box>
          ))}
        </Box>
      )}
      {/* eslint-enable react/no-array-index-key */}
    </Highlight>
  )
}
