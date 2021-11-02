import * as React from 'react'

import { Heading, Stack, Text } from '../'

type Props = {
  label: string
  value: string | number
  subValue?: string | number
  size?: 'sm' | 'md'
}

export const Stat = ({ label, value, subValue, size = 'md' }: Props) => {
  return (
    <Stack space={size == 'md' ? '1' : '2'}>
      <Text variant="label">{label}</Text>
      {size === 'md' ? (
        <Heading level="2">{value}</Heading>
      ) : (
        <Text size="large" weight="semiBold">
          {subValue}
        </Text>
      )}
      {subValue !== undefined && <Text color="textTertiary">{subValue}</Text>}
    </Stack>
  )
}
