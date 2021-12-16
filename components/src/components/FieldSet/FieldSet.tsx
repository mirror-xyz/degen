import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Heading } from '../Heading'
import { Stack } from '../Stack'
import { Tag, TagProps } from '../Tag'

type NativeFieldSetProps = React.AllHTMLAttributes<HTMLFieldSetElement>

type Props = {
  children: ReactNodeNoStrings
  description?: string | React.ReactNode
  disabled?: NativeFieldSetProps['disabled']
  form?: NativeFieldSetProps['form']
  name?: NativeFieldSetProps['name']
  legend: string
  status?:
    | 'required'
    | 'optional'
    | 'pending'
    | 'complete'
    | {
        name: string
        tone: TagProps['tone']
      }
}

export const FieldSet = ({
  children,
  description,
  disabled,
  form,
  legend,
  name,
  status,
}: Props) => {
  let statusText: string | undefined
  let statusTone: TagProps['tone']
  switch (status) {
    case 'complete': {
      statusText = 'Complete'
      statusTone = 'green'
      break
    }
    case 'required':
    case 'pending': {
      statusText = status === 'pending' ? 'Pending' : 'Required'
      statusTone = 'accent'
      break
    }
    case 'optional': {
      statusText = 'Optional'
      statusTone = 'secondary'
      break
    }
  }
  if (typeof status === 'object') {
    statusText = status.name
    statusTone = status.tone
  }

  return (
    <Box
      as="fieldset"
      disabled={disabled}
      display="flex"
      flexDirection="column"
      form={form}
      gap="4"
      name={name}
    >
      <Box display="flex" flexDirection="column" gap="1" paddingX="4">
        <Stack align="center" direction="horizontal" space="3">
          <Heading as="legend" level="2" responsive>
            {legend}
          </Heading>
          {statusTone && statusText && (
            <Tag tone={statusTone}>{statusText}</Tag>
          )}
        </Stack>

        <Box color="textSecondary" fontSize="base">
          {description}
        </Box>
      </Box>

      <Stack>{children}</Stack>
    </Box>
  )
}
