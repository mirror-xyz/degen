import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { Context } from '../SkeletonGroup'
import * as styles from './styles.css'

type Props = {
  backgroundColor?: BoxProps['backgroundColor']
  radius?: BoxProps['borderRadius']
  height?: BoxProps['height']
  loading?: boolean
  width?: BoxProps['width']
}

export const Skeleton = ({
  backgroundColor = 'foregroundSecondary',
  radius = 'medium',
  children,
  height,
  loading,
  width = 'fit',
}: React.PropsWithChildren<Props>) => {
  const groupLoading = React.useContext(Context)
  const active = loading ?? groupLoading
  const containerProps = active
    ? {
        backgroundColor,
        borderRadius: radius,
        height,
        width,
      }
    : {}
  return (
    <Box {...containerProps}>
      <div className={active ? styles.root : undefined}>{children}</div>
    </Box>
  )
}
