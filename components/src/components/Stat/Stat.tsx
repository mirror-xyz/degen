import * as React from 'react'

import { Heading, Stack, Text } from '../'

type Props = {
  label: string
  size?: 'small' | 'medium'
  subValue?: string | number
  value: string | number
}

export const Stat = ({ size = 'medium', subValue, value, label }: Props) => {
  return (
    <Stack space={size == 'medium' ? '1' : '2'}>
      <Text variant="label">{label}</Text>
      {size === 'medium' ? (
        <Heading level="2" responsive>
          {value}
        </Heading>
      ) : (
        <Text size="large" weight="semiBold">
          {value}
        </Text>
      )}
      {subValue !== undefined && <Text color="textTertiary">{subValue}</Text>}
    </Stack>
  )
}
