import * as React from 'react'
import {
  default as Highlight,
  Language,
  defaultProps,
} from 'prism-react-renderer'

type Props = {
  className?: string
  children?: string
}

export const CodeBlock = ({ children = '', className = '' }: Props) => {
  const language = className.replace(/language-/, '') as Language
  return (
    <Highlight {...defaultProps} code={children.trim()} language={language}>
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
