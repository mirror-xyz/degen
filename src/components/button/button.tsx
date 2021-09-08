import * as React from 'react'
import clsx from 'clsx'

import { Box, BoxProps, createVariants } from '../box'
import { Text } from '../text'
import { Spinner } from '../spinner'
import * as styles from './styles.css'

const sizes = createVariants({
  sm: {
    borderRadius: 'md',
    fontSize: 'base',
    height: 10,
    px: 4,
  },
  md: {
    borderRadius: 'xl',
    fontSize: 'lg',
    height: 14,
    px: 5,
  },
})

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>
type Props = {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  size?: keyof typeof sizes
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  variant?: keyof typeof styles.variants
  width?: BoxProps['width']
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  'aria-controls'?: NativeButtonProps['aria-controls']
  'aria-expanded'?: NativeButtonProps['aria-expanded']
  'aria-describedby'?: NativeButtonProps['aria-describedby']
}

export const Button = React.forwardRef(
  (
    {
      children,
      disabled,
      loading,
      size = 'md',
      tabIndex,
      type,
      variant = 'secondary',
      width,
      onClick,
      ...ariaProps
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const clickable = !disabled && !loading
    const disabledProps: BoxProps = !clickable
      ? {
          background: 'foregroundSecondary',
          color: 'textSecondary',
          cursor: 'not-allowed',
        }
      : {}
    return (
      <Box
        alignItems="center"
        as="button"
        className={clsx(clickable && styles.variants[variant])}
        disabled={!clickable}
        display="flex"
        gap={4}
        justifyContent="center"
        overflow="hidden"
        ref={ref}
        tabIndex={tabIndex}
        transitionDuration={150}
        transitionProperty="default"
        transitionTimingFunction="inOut"
        type={type}
        width={width}
        onClick={onClick}
        {...sizes[size]}
        {...disabledProps}
        {...ariaProps}
      >
        <Text
          color="inherit"
          lineHeight="none"
          overflow="hidden"
          textOverflow="ellipsis"
          weight="medium"
          whiteSpace="nowrap"
        >
          {children}
        </Text>
        {loading && <Spinner />}
      </Box>
    )
  },
)
