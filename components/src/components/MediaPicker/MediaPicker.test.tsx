import * as React from 'react'

import { cleanup, render, screen, userEvent } from '@/test'

import { MediaPicker } from './MediaPicker'

describe('<MediaPicker />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<MediaPicker label="Choose or drag and drop an image" />)
    expect(screen.getByLabelText(/choose/i)).toBeInTheDocument()
  })

  it('receives user input', () => {
    render(<MediaPicker label="Choose or drag and drop an image" />)

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByLabelText(/choose/i) as HTMLInputElement
    userEvent.upload(input, file)

    expect(input?.files?.[0]).toStrictEqual(file)
    expect(input?.files?.item(0)).toStrictEqual(file)
    expect(input.files).toHaveLength(1)
  })
})
