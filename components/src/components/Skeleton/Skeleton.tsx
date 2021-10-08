import * as React from 'react'

import { Atoms } from '~/css'
import { Box } from '../Box'
import { Context } from '../SkeletonGroup'
import * as styles from './styles.css'

type Props = {
  backgroundColor?: Atoms['backgroundColor']
  radius?: Atoms['borderRadius']
  height?: Atoms['height']
  loading?: boolean
  width?: Atoms['width']
}

export const Skeleton = ({
  backgroundColor = 'foregroundSecondary',
  radius = '1.5',
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
