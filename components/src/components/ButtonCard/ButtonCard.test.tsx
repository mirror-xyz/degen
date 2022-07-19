import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { ButtonCard } from './ButtonCard'
import { IconExclamationCircle } from '../icons/generated/IconExclamationCircle'

describe('<ButtonCard />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ButtonCard
        buttonText="OK"
        prefix={<IconExclamationCircle color="accent" />}
      >
        Connect your wallet.
      </ButtonCard>,
    )
    expect(screen.getByText(/connect/i)).toBeInTheDocument()
    expect(screen.getByText(/OK/i)).toBeInTheDocument()
  })
})
