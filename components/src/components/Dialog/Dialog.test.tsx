import * as React from 'react'

import { cleanup, render } from '@/test'

import { Dialog } from './Dialog'

describe('<Dialog />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Dialog />)
  })
})

