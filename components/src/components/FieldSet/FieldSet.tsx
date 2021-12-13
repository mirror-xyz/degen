import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Heading } from '../Heading'
import { Stack } from '../Stack'
import { Tag } from '../Tag'

type NativeFieldSetProps = React.AllHTMLAttributes<HTMLFieldSetElement>

type Props = {
  children: ReactNodeNoStrings
  description?: string | React.ReactNode
  disabled?: NativeFieldSetProps['disabled']
  form?: NativeFieldSetProps['form']
  hideRequiredStatus?: boolean
  name?: NativeFieldSetProps['name']
  legend: string
  required?: boolean
}

export const FieldSet = ({
  children,
  description,
  disabled,
  form,
  hideRequiredStatus,
  legend,
  name,
  required,
}: Props) => {
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
          {!hideRequiredStatus && (
            <Tag tone={required ? 'accent' : 'secondary'}>
              {required ? 'Required' : 'Optional'}
            </Tag>
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
