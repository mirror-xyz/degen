import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { IconUserSolid } from '../icons'
import * as styles from './styles.css'

export type Props = {
  as?: 'img' | React.ComponentType
  label: string
  placeholder?: boolean
  border?: boolean
  size?: BoxProps['height']
  src?: string
} & styles.Variants

export const Avatar = ({
  as = 'img',
  label,
  placeholder,
  border = true,
  shape = 'circle',
  size = '12',
  src,
}: Props) => {
  return (
    <Box
      backgroundColor="foregroundSecondary"
      className={styles.variants({ shape })}
      height={size}
      minWidth={size}
      overflow="hidden"
      position="relative"
      width={size}
    >
      {placeholder ? (
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
            src={src}
            width="full"
            {...{
              decoding: 'async',
              layout: typeof as === 'string' ? undefined : 'fill',
            }}
          />
          {border && (
            <Box
              boxShadow="-px"
              className={styles.variants({ shape })}
              height="full"
              pointerEvents="none"
              position="absolute"
              width="full"
            />
          )}
        </>
      )}
    </Box>
  )
}
