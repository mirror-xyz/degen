import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Dialog } from './Dialog'

describe('<Dialog />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Dialog
        open
        title="Welcome"
        onClose={() => {
          console.log('close')
        }}
      >
        Test
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
