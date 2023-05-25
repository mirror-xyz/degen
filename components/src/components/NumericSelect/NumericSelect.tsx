import * as React from 'react'

import { Box } from '../Box'
import { Text } from '../Text'
import { IconMinus, IconPlus } from '../icons'

type Props = {
  count: number
  onChange: (newCount: number) => void
  max?: number
  min?: number
  showMaxButton?: boolean
}

export const NumericSelect = ({
  count,
  onChange,
  max,
  showMaxButton,
  min = 1,
}: Props) => {
  const decrement = React.useCallback(
    () => onChange(count - 1),
    [count, onChange],
  )

  const increment = React.useCallback(
    () => onChange(count + 1),
    [count, onChange],
  )

  const setMax = React.useCallback(() => onChange(max || 0), [max, onChange])

  const isMin = count === min
  const isMax = max ? count === max : false

  return (
    <Box
      alignItems="center"
      backgroundColor="foregroundTertiary"
      borderRadius="large"
      display="flex"
      height="10"
      justifyContent="center"
      position="relative"
    >
      <Box
        alignItems="center"
        as="button"
        cursor={isMin ? 'not-allowed' : 'pointer'}
        disabled={isMin}
        display="flex"
        left="4"
        padding="2.5"
        position="absolute"
        onClick={decrement}
      >
        <IconMinus
          color={isMin ? 'textTertiary' : 'textSecondary'}
          size="3.5"
        />
      </Box>
      <Text color="text" size="small" weight="semiBold">
        {count}
      </Text>
      <Box
        alignItems="center"
        display="flex"
        gap="2.5"
        position="absolute"
        right="4"
      >
        {showMaxButton && max && !isMax && (
          <Box
            as="button"
            backgroundColor="foregroundTertiary"
            borderRadius="medium"
            cursor={isMax ? 'not-allowed' : 'pointer'}
            disabled={isMax}
            marginY="2.5"
            padding="1"
            onClick={setMax}
          >
            <Text color="textSecondary" size="label">
              Max
            </Text>
          </Box>
        )}
        <Box
          as="button"
          cursor={isMax ? 'not-allowed' : 'pointer'}
          disabled={isMax}
          padding="2.5"
          onClick={increment}
        >
          <IconPlus
            color={isMax ? 'textTertiary' : 'textSecondary'}
            size="3.5"
          />
        </Box>
      </Box>
    </Box>
  )
}
