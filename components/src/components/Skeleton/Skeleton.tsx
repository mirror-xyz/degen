import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { Context } from '../SkeletonGroup'
import * as styles from './styles.css'

type Props = {
  as?: 'div' | 'span'
  backgroundColor?: BoxProps['backgroundColor']
  radius?: BoxProps['borderRadius']
  height?: BoxProps['height']
  loading?: boolean
  maxWidth?: BoxProps['maxWidth']
  width?: BoxProps['width']
}

export const Skeleton = ({
  as,
  backgroundColor = 'foregroundSecondary',
  radius = 'medium',
  children,
  height,
  loading,
  maxWidth,
  width = 'fit',
}: React.PropsWithChildren<Props>) => {
  const groupLoading = React.useContext(Context)
  const active = loading ?? groupLoading
  const containerProps = active
    ? {
        backgroundColor,
        borderRadius: radius,
        height,
        maxWidth,
        width,
      }
    : {}
  return (
    <Box as={as} {...containerProps}>
      <Box
        as="span"
        className={active ? styles.root : undefined}
        display="block"
      >
        {children}
      </Box>
    </Box>
  )
}
