import * as React from 'react'

import { cleanup, render, screen, userEvent } from '@/test'

import { Textarea } from './Textarea'

describe('<Textarea />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Textarea label="Why are you entering $WRITE Race?" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', () => {
    render(<Textarea label="Why are you entering $WRITE Race?" />)

    userEvent.type(screen.getByRole('textbox'), 'I love writing and crypto.')
    expect(screen.getByRole('textbox')).toHaveValue(
      'I love writing and crypto.',
    )
  })

  it('maxLength', () => {
    render(
      <Textarea label="Why are you entering $WRITE Race?" maxLength={14} />,
    )

    const element = screen.getByLabelText(/why/i)
    userEvent.type(element, 'I love writing and crypto.')
    expect(element).toHaveValue('I love writing')
  })
})
