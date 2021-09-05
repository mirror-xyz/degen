import { flatten } from 'lodash'

import { Snippet } from './types'

const req = require.context('../components', true, /\.snippets\.tsx?$/)
export default flatten(
  req.keys().map((filename: string) => {
    const matches = filename.match(/([a-zA-Z]+)\.snippets\.tsx?$/)
    if (!matches) return []

    const snippets = req(filename).snippets as Snippet[]

    return snippets.map((snippet) => ({
      ...snippet,
      group: snippet.group || matches[1],
      code: snippet.code,
    }))
  }),
)
