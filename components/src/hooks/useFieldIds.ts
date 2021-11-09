import * as React from 'react'

import { useId } from './useId'

type Args = {
  description?: boolean
  error?: boolean
  id?: string
}

export const useFieldIds = ({
  description: hasDescription,
  error: hasError,
  id: contentId,
}: Args = {}) => {
  const _id = useId()
  return React.useMemo(() => {
    const id = `${_id}${contentId ? `-${contentId}` : ''}`
    const labelId = `${id}-label`

    let describedBy
    let description
    if (hasDescription) {
      description = { id: `${id}-description` }
      describedBy = description.id
    }

    let error
    if (hasError) {
      error = { id: `${id}-error` }
      describedBy = `${describedBy ? `${describedBy} ` : ''}${error.id}`
    }

    return {
      content: {
        'aria-describedby': describedBy,
        'aria-labelledby': labelId,
        id,
      },
      description,
      error,
      label: {
        htmlFor: id,
        id: labelId,
      },
    }
  }, [_id, hasDescription, hasError, contentId])
}
