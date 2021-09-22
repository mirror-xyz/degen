import React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'

type Props = {
  children: string
  className: string
  live: boolean
  render: boolean
}

export const CodeBlock = ({ children, className, live, render }: Props) => {
  const language = className.replace(/language-/, '') as Language

  console.log({
    children,
    live,
    render,
  })

  if (live) {
    return (
      <div style={{ marginTop: '40px', backgroundColor: 'black' }}>
        <LiveProvider
          code={children.trim()}
          scope={{ mdx }}
          transformCode={(code) => '/** @jsx mdx */' + code}
        >
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </div>
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
