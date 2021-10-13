import * as React from 'react'

import { useIsoMorphicEffect } from './useIsoMorphicEffect'
import { useServerHandoffComplete } from './useServerHandoffComplete'

const idPrefix = 'degen'

let id = 0
function generateId() {
  return ++id
}

export const useId = () => {
  const ready = useServerHandoffComplete()
  const [id, setId] = React.useState(ready ? generateId : null)

  useIsoMorphicEffect(() => {
    if (id === null) setId(generateId())
  }, [id])

  return id != null ? `${idPrefix}` + id : undefined
}
