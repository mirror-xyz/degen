import flatten from 'lodash/flatten'
import reactElementToJSXString from 'react-element-to-jsx-string'

import { Snippet } from './types'

const req = require.context(
  '../../components/src/components',
  true,
  /\.snippets\.tsx?$/,
)

const snippets = flatten(
  req.keys().map((filename: string) => {
    const matches = filename.match(/([a-zA-Z-]+)\.snippets\.tsx?$/)
    if (!matches) return []

    const snippets = req(filename).snippets as Snippet[]

    return snippets.map((snippet) => {
      const displayName = matches[1]
      return {
        ...snippet,
        group: snippet.group || displayName,
        code: reactElementToJSXString(snippet.code),
      }
    })
  }),
)

export default snippets
