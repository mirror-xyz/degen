import * as React from 'react'
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import { vars } from 'degen/css'
import { Box, BoxProps, useTheme } from 'degen/components'

import { useIsMounted } from '~/utils/isMounted'

import { CopyButton } from './CopyButton'
import type { Props as CodePreviewProps } from './CodePreview'

const CodePreview = dynamic<CodePreviewProps>(
  () => import('./CodePreview').then((mod) => mod.CodePreview),
  {
    loading: () => (
      <Box
        backgroundColor="backgroundSecondary"
        borderRadius="large"
        height="192px"
        width="full"
      />
    ),
  },
)

type Props = {
  backgroundColor?: BoxProps['backgroundColor']
  children: string
  className: string
  live?: boolean
  expand?: boolean
}

export const CodeBlock = ({
  backgroundColor,
  children,
  className,
  live,
  expand,
}: Props) => {
  const isMounted = useIsMounted()
  const { mode } = useTheme()
  const theme = mode === 'light' ? vsLight : vsDark
  const modifiedTheme: PrismTheme | undefined = isMounted
    ? {
        ...theme,
        plain: {
          ...theme.plain,
          color: vars.colors.foreground,
          backgroundColor: vars.colors.foregroundTertiary,
        },
      }
    : undefined

  const code = children.trim()
  if (live)
    return (
      <CodePreview
        backgroundColor={backgroundColor}
        code={code}
        expand={expand}
        theme={modifiedTheme}
      />
    )

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
          borderRadius="2xLarge"
          className={className}
          padding="24px"
          position="relative"
          style={style}
        >
          <Box position="absolute" right="14px" top="14px">
            <CopyButton content={code} />
          </Box>

          {tokens.map((line, i) => (
            <Box
              key={i}
              paddingRight="32px"
              whiteSpace="pre-wrap"
              {...getLineProps({ line, key: i })}
            >
              {line.map((token, key) => (
                <Box
                  as="span"
                  fontFamily="mono"
                  fontSize="base"
                  key={key}
                  lineHeight="1.5"
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
