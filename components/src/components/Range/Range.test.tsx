import * as React from 'react'

import { cleanup, render } from '@/test'

import { Range } from './Range'

describe('<Range />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Range />)
  })
})
