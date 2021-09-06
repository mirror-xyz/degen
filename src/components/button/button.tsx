import * as React from 'react'

import { useBoxProps } from '~/hooks'
import { createVariants } from '~/utils'
import { Box } from '../box'

const sizes = createVariants({
  sm: {},
  md: {},
})

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>
type Props = {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  size?: keyof typeof sizes
  tabIndex?: NativeButtonProps['tabIndex']
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  'aria-controls'?: NativeButtonProps['aria-controls']
  'aria-expanded'?: NativeButtonProps['aria-expanded']
  'aria-describedby'?: NativeButtonProps['aria-describedby']
}

export const Button = ({
  children,
  disabled,
  loading,
  size = 'md',
  tabIndex,
  type,
  onClick,
  ...ariaProps
}: Props) => {
  const inactive = disabled || loading
  const boxProps = useBoxProps({
    ...(inactive ? { cursor: 'not-allowed' } : {}),
  })
  return (
    <Box
      as="button"
      {...sizes[size]}
      {...boxProps}
      {...ariaProps}
      disabled={inactive}
      tabIndex={tabIndex}
      type={type}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}
