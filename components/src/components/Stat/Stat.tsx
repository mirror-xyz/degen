import * as React from 'react'

import { Heading } from '../Heading'
import { Stack } from '../Stack'
import { Text } from '../Text'

type Props = {
  label: React.ReactNode
  meta?: React.ReactNode
  size?: 'small' | 'medium'
  value: React.ReactNode
}

export const Stat = ({ label, meta, size = 'medium', value }: Props) => {
  return (
    <Stack space={size === 'medium' ? 'px' : '0.5'}>
      <Text variant="label">{label}</Text>
      {size === 'medium' ? (
        <Heading level="2" responsive>
          {value}
        </Heading>
      ) : (
        <Text lineHeight="1.25" size="large" weight="semiBold">
          {value}
        </Text>
      )}
      {meta !== undefined && <Text color="textTertiary">{meta}</Text>}
    </Stack>
  )
}
