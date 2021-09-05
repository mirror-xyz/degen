import { Snippets as PlayroomSnippets } from 'playroom'
import { Optional } from 'utility-types'

export type Snippet = Optional<PlayroomSnippets[number], 'group'>
