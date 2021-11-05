import * as React from 'react'

import { cleanup, render } from '@/test'

import { MediaPicker } from './MediaPicker'

describe('<MediaPicker />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<MediaPicker label="Choose or drag and drop an image" />)
  })
})
