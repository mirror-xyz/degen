import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Stack } from '../Stack'
import { VisuallyHidden } from '../VisuallyHidden'
import { useFieldIds } from './utils'

type State = ReturnType<typeof useFieldIds> | undefined
const Context = React.createContext<State>(undefined)

type NativeFormProps = React.AllHTMLAttributes<HTMLFormElement>

export type FieldBaseProps = {
  description?: React.ReactNode
  error?: React.ReactNode
  hideLabel?: boolean
  label: React.ReactNode
  labelSecondary?: React.ReactNode
  required?: NativeFormProps['required']
}

type Props = FieldBaseProps & {
  children: React.ReactElement | ((context: State) => ReactNodeNoStrings)
  id?: NativeFormProps['id']
}

export const Field = ({
  children,
  description,
  error,
  hideLabel,
  id,
  label,
  labelSecondary,
  required,
}: Props) => {
  const ids = useFieldIds({
    id,
    description: description !== undefined,
    error: error !== undefined,
  })

  const labelContent = (
    <Box
      alignItems="flex-end"
      display="flex"
      justifyContent="space-between"
      paddingX="4"
    >
      <Box as="label" color="text" fontWeight="medium" {...ids.label}>
        {label} {required && <VisuallyHidden>(required)</VisuallyHidden>}
      </Box>
      {labelSecondary && labelSecondary}
    </Box>
  )

  // Allow children to consume ids or try to clone ids onto it
  let content: React.ReactNode | null
  if (typeof children === 'function')
    content = (
      <Context.Provider value={ids}>
        <Context.Consumer>{(context) => children(context)}</Context.Consumer>
      </Context.Provider>
    )
  else if (children) content = React.cloneElement(children, ids.content)
  else content = children

  return (
    <Stack space="2">
      {hideLabel ? (
        <VisuallyHidden>{labelContent}</VisuallyHidden>
      ) : (
        labelContent
      )}

      {content}

      {description && (
        <Box color="textSecondary" paddingX="4" {...ids.description}>
          {description}
        </Box>
      )}

      {error && (
        <Box aria-live="polite" color="red" paddingX="4" {...ids.error}>
          {error}
        </Box>
      )}
    </Stack>
  )
}
