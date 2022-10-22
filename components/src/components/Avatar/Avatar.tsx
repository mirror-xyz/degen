import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

export type Props = {
  as?: 'img' | React.ComponentType
  label: string
  placeholder?: boolean
  address?: string
  noBorder?: boolean
  size?: BoxProps['height']
  src?: string
} & styles.Variants

export function getAvatarGradient(address = '0') {
  const BACKGROUND_GRADIENTS = [
    {
      color: 'blue',
      value:
        'radial-gradient(79.05% 79.05% at 21.62% 20.95%, #007AFF 0%, #00E0FF 100%)',
    },
    {
      color: 'orange',
      value:
        'radial-gradient(79.05% 79.05% at 21.62% 20.95%, #FF3B30 0%, #FFA030 100%)',
    },
    {
      color: 'green',
      value:
        'radial-gradient(79.05% 79.05% at 21.62% 20.95%, #34C759 34.38%, #7AF599 100%)',
    },
  ] as const

  return BACKGROUND_GRADIENTS[parseInt(address ?? '0') % 3]
}

export const Avatar = ({
  as = 'img',
  label,
  placeholder,
  address,
  noBorder,
  shape = 'circle',
  size = '12',
  src,
}: Props) => {
  const [error, setError] = React.useState(false)

  const onError = React.useMemo(() => {
    if (as !== 'img' || error) {
      return undefined
    }

    return () => setError(true)
  }, [as, error])

  const showPlaceholder = placeholder || error || !src

  return (
    <Box
      backgroundColor={showPlaceholder ? undefined : 'foregroundSecondary'}
      className={styles.variants({
        shape,
        noBorder: showPlaceholder || noBorder,
      })}
      height={size}
      minWidth={size}
      overflow="hidden"
      position="relative"
      style={{ background: getAvatarGradient(address).value }}
      width={size}
    >
      {!showPlaceholder && (
        <>
          <Box
            alt={label}
            as={as}
            height="full"
            objectFit="cover"
            src={src}
            width="full"
            {...{
              decoding: 'async',
              layout: typeof as === 'string' ? undefined : 'fill',
            }}
            onError={onError}
          />
        </>
      )}
    </Box>
  )
}
