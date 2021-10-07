import * as React from 'react'

import { ReactNodeNoStrings } from '~/types'

import { Box } from '../Box'
import { Stack } from '../Stack'
import { VisuallyHidden } from '../VisuallyHidden'
import { useFieldIds } from './utils'

export const Context = React.createContext<
  ReturnType<typeof useFieldIds> | undefined
>(undefined)

type NativeFormProps = React.AllHTMLAttributes<HTMLFormElement>

export type FieldBaseProps = {
  description?: React.ReactNode
  error?: React.ReactNode
  hideLabel?: boolean
  label: React.ReactNode
  required?: NativeFormProps['required']
}

type Props = FieldBaseProps & {
  children: ReactNodeNoStrings
  id: NativeFormProps['id']
}

export const Field = ({
  children,
  description,
  error,
  hideLabel,
  id,
  label,
  required,
}: Props) => {
  const ids = useFieldIds({
    id,
    description: description !== undefined,
    error: error !== undefined,
  })

  const labelContent = (
    <Box
      as="label"
      color="text"
      fontWeight="medium"
      paddingX="4"
      {...ids.label}
    >
      {label} {required && <VisuallyHidden>(required)</VisuallyHidden>}
    </Box>
  )

  return (
    <Context.Provider value={ids}>
      <Stack direction="vertical" space="2">
        {hideLabel ? (
          <VisuallyHidden>{labelContent}</VisuallyHidden>
        ) : (
          labelContent
        )}

        {children}

        {description && (
          <Box color="textSecondary" paddingX="4" {...ids.description}>
            {description}
          </Box>
        )}

        {error && (
          <Box color="red" paddingX="4" {...ids.error}>
            {error}
          </Box>
        )}
      </Stack>
    </Context.Provider>
  )
}