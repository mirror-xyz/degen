import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { useFieldIds } from '../../hooks'
import { Context as FieldSetContext } from '../FieldSet'
import { Box, BoxProps } from '../Box'
import { VisuallyHidden } from '../VisuallyHidden'

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
  width?: BoxProps['width']
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
  width = 'full',
}: Props) => {
  const fieldSetProps = React.useContext(FieldSetContext)
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
      <Box
        as="label"
        color={fieldSetProps.size === 'small' ? 'textSecondary' : 'text'}
        fontSize="small"
        fontWeight="medium"
        {...ids.label}
      >
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
    <Box display="flex" flexDirection="column" gap="2" width={width}>
      {hideLabel ? (
        <VisuallyHidden>{labelContent}</VisuallyHidden>
      ) : (
        labelContent
      )}

      {content}

      {description && (
        <Box
          color={
            fieldSetProps.size === 'small' ? 'textTertiary' : 'textSecondary'
          }
          fontSize="small"
          paddingX="4"
          {...ids.description}
        >
          {description}
        </Box>
      )}

      {error && (
        <Box
          aria-live="polite"
          color="red"
          fontSize="small"
          paddingX="4"
          {...ids.error}
        >
          {error}
        </Box>
      )}
    </Box>
  )
}
