import * as React from 'react'

const state = { serverHandoffComplete: false }

export const useServerHandoffComplete = () => {
  const [serverHandoffComplete, setServerHandoffComplete] = React.useState(
    state.serverHandoffComplete,
  )

  React.useEffect(() => {
    if (serverHandoffComplete) return
    setServerHandoffComplete(true)
  }, [serverHandoffComplete])

  React.useEffect(() => {
    if (state.serverHandoffComplete) return
    state.serverHandoffComplete = true
  }, [])

  return serverHandoffComplete
}
