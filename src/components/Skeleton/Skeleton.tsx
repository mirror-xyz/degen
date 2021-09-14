import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

type SkeletonGroupProps = {
  loading?: boolean
}

const Context = React.createContext<boolean | undefined>(undefined)

export const SkeletonGroup = ({
  children,
  loading,
}: React.PropsWithChildren<SkeletonGroupProps>) => {
  return <Context.Provider value={loading}>{children}</Context.Provider>
}

SkeletonGroup.displayName = 'SkeletonGroup'

type SkeletonProps = {
  backgroundColor?: BoxProps['backgroundColor']
  radius?: BoxProps['borderRadius']
  height?: BoxProps['height']
  loading?: boolean
  width?: BoxProps['width']
}

export const Skeleton = ({
  backgroundColor = 'foregroundSecondary',
  radius = 'md',
  children,
  height,
  loading,
  width = 'max',
}: React.PropsWithChildren<SkeletonProps>) => {
  const contextValue = React.useContext(Context)
  const active = loading ?? contextValue
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

Skeleton.displayName = 'Skeleton'
