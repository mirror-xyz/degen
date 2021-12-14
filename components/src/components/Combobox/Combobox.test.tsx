import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Combobox } from './Combobox'

describe('<Combobox />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Combobox />)
  })
})