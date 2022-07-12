import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { IconUserSolid } from '../icons'
import * as styles from './styles.css'

export type Props = {
  as?: 'img' | React.ComponentType
  label: string
  placeholder?: boolean
  noBorder?: boolean
  size?: BoxProps['height']
  src?: string
} & styles.Variants

export const Avatar = ({
  as = 'img',
  label,
  placeholder,
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

  return (
    <Box
      backgroundColor="foregroundSecondary"
      className={styles.variants({ shape, noBorder: placeholder || noBorder })}
      height={size}
      minWidth={size}
      overflow="hidden"
      position="relative"
      width={size}
    >
      {placeholder || error ? (
        <Box
          alignItems="center"
          aria-label={label}
          display="flex"
          height="full"
          justifyContent="center"
        >
          <Box maxWidth="3/4">
            <IconUserSolid color="textSecondary" size="full" />
          </Box>
        </Box>
      ) : (
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
