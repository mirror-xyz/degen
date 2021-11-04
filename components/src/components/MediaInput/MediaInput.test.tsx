import * as React from 'react'

import { cleanup, render } from '@/test'

import { MediaInput } from './MediaInput'

describe('<MediaInput />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<MediaInput label="Choose or drag and drop an image" />)
  })
})
