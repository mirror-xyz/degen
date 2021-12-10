import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { FileInput } from './FileInput'

describe('<FileInput />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <FileInput>
        {(context) =>
          context.name ? <div>{context.name}</div> : <div>Upload file</div>
        }
      </FileInput>,
    )
    expect(screen.getByText(/upload/i)).toBeInTheDocument()
  })
})
