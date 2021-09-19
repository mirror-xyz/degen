import * as React from 'react'
import {
  default as Highlight,
  Language,
  defaultProps,
} from 'prism-react-renderer'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'

import * as Components from '../../src/components'

type Props = {
  className?: string
  children?: string
  live?: boolean
  render?: boolean
}

export const CodeBlock = ({
  children = '',
  className = '',
  live,
  render,
}: Props) => {
  const language = className.replace(/language-/, '') as Language
  console.log({ live, render, children })
  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{ mdx, ...Components }}
        transformCode={(code) => '/** @jsx mdx */' + code}
      >
        <LivePreview />
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    )
  }

  if (render) {
    return (
      <div style={{ marginTop: '40px' }}>
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

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
