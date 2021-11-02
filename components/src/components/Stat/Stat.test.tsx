import * as React from 'react'

import { cleanup, render } from '@/test'

import { Stat } from './Stat'

describe('<Stat />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Stat />)
  })
})
