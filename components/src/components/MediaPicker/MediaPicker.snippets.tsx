import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { MediaPicker } from './MediaPicker'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <MediaPicker label="Choose or drag and drop an image" />,
  },
]
