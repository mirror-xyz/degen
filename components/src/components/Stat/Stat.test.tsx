import * as React from 'react'

import { cleanup, render } from '@/test'

import { Stat } from './Stat'

describe('<Stat />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Stat label="Current time" meta="12:01am" value="October 3rd, 2021" />,
    )
  })
})
