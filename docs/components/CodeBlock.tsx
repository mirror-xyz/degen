import * as React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import { useTheme } from '~/components'
import type { Props as CodePreviewProps } from './CodePreview'

const CodePreview = dynamic<CodePreviewProps>(() =>
  import('./CodePreview').then((mod) => mod.CodePreview),
)

type Props = {
  children: string
  className: string
  live: boolean
  render: boolean
}

export const CodeBlock = ({ children, className, live, render }: Props) => {
  const { mode } = useTheme()
  const theme = mode === 'light' ? vsLight : vsDark

  const code = children.trim()
  if (live || render)
    return <CodePreview code={code} live={live} theme={theme} />

  const language = className.replace(/language-/, '') as Language
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {/* eslint-disable react/no-array-index-key */}
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
      {/* eslint-enable react/no-array-index-key */}
    </Highlight>
  )
}
