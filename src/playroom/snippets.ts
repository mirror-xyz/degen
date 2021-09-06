import { camelCase, flatten, upperFirst } from 'lodash'
import reactElementToJSXString from 'react-element-to-jsx-string'

import { Snippet } from './types'

const req = require.context('../components', true, /\.snippets\.tsx?$/)
export default flatten(
  req.keys().map((filename: string) => {
    const matches = filename.match(/([a-zA-Z-]+)\.snippets\.tsx?$/)
    if (!matches) return []

    const snippets = req(filename).snippets as Snippet[]

    return snippets.map((snippet) => {
      const displayName = upperFirst(camelCase(matches[1]))
      return {
        ...snippet,
        group: snippet.group || displayName,
        code: reactElementToJSXString(snippet.code, {
          displayName: (_element) => displayName,
        }),
      }
    })
  }),
)
