import * as React from 'react'
import { default as copy } from 'copy-to-clipboard'

import { Button, IconCheck, IconDuplicate } from 'degen/components'

type Props = {
  content: string
}

type State = {
  copied: boolean
}

const initialState = {
  copied: false,
}

export const CopyButton = ({ content }: Props) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const [state, setState] = React.useState<State>(initialState)

  const onClick = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      setState((x) => ({ ...x, copied: false }))
    }

    copy(content, {
      format: 'text/plain',
    })

    setState((x) => ({ ...x, copied: true }))
    timeoutRef.current = setTimeout(
      () => setState((x) => ({ ...x, copied: false })),
      500,
    )
  }, [content])

  return (
    <Button shape="square" size="small" variant="tertiary" onClick={onClick}>
      {state.copied ? (
        <IconCheck title="Copied" titleId="copied" />
      ) : (
        <IconDuplicate title="Copy to Clipboard" titleId="copy" />
      )}
    </Button>
  )
}
