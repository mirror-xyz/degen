import * as React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import dynamic from 'next/dynamic'

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
  const code = children.trim()
  if (live || render) return <CodePreview code={code} live={live} />

  const language = className.replace(/language-/, '') as Language
  return (
    <Highlight {...defaultProps} code={code} language={language}>
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
