import React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { createUrl } from 'playroom/utils'

import * as Components from '~/components'

type Props = {
  children: string
  className: string
  live: boolean
  render: boolean
}

export const CodeBlock = ({ children, className, live, render }: Props) => {
  const language = className.replace(/language-/, '') as Language
  const code = children.trim()
  const playroomUrl = createUrl({ baseUrl: 'localhost:8082', code })
  console.log(playroomUrl)

  if (live) {
    return (
      <div style={{ marginTop: '40px', backgroundColor: 'black' }}>
        <LiveProvider
          code={code}
          scope={{ mdx, ...Components }}
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
        <LiveProvider code={code}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

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
