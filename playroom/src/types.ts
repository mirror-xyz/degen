import { Snippets as PlayroomSnippets } from 'playroom'
import { Optional } from 'utility-types'

export type Snippet = Omit<
  Optional<PlayroomSnippets[number], 'group'>,
  'code'
> & {
  code: React.ReactElement
}
