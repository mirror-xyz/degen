import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box, BoxProps } from '../Box'
import { Heading } from '../Heading'
import { Stack } from '../Stack'
import { Tag, TagProps } from '../Tag'
import { Text } from '../Text'

type NativeFieldSetProps = React.AllHTMLAttributes<HTMLFieldSetElement>

type Props = {
  children: ReactNodeNoStrings
  description?: string | React.ReactNode
  disabled?: NativeFieldSetProps['disabled']
  form?: NativeFieldSetProps['form']
  name?: NativeFieldSetProps['name']
  legend: string
  size?: 'medium' | 'small'
  space?: BoxProps['gap']
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

export const Context = React.createContext<{ size?: Props['size'] }>({})

export const FieldSet = ({
  children,
  description,
  disabled,
  form,
  legend,
  name,
  size,
  space = '4',
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

  const isSmall = size === 'small'

  return (
    <Box
      as="fieldset"
      disabled={disabled}
      display="flex"
      flexDirection="column"
      form={form}
      gap={space}
      name={name}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={isSmall ? '0' : '1'}
        paddingX="4"
      >
        <Stack align="center" direction="horizontal" space="3">
          {isSmall ? (
            <Text size="base" weight="semiBold">
              {legend}
            </Text>
          ) : (
            <Heading as="legend" level="2" responsive>
              {legend}
            </Heading>
          )}
          {statusTone && statusText && (
            <Tag size={isSmall ? 'small' : 'medium'} tone={statusTone}>
              {statusText}
            </Tag>
          )}
        </Stack>

        <Box
          color="textSecondary"
          fontSize={isSmall ? 'small' : 'base'}
          lineHeight={isSmall ? '1.5' : undefined}
        >
          {description}
        </Box>
      </Box>

      <Context.Provider value={{ size }}>
        <Stack space={space}>{children}</Stack>
      </Context.Provider>
    </Box>
  )
}
