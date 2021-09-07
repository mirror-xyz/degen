import * as React from 'react'

import { Box, createVariants, useBoxProps } from '../box'
import { Text } from '../text'

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

const variants = createVariants({
  highlight: {
    color: 'accentText',
    background: 'accent',
    boxShadow: { hover: 'containerMd', active: 'containerSm' },
    boxShadowColor: 'accent',
  },
  primary: {
    color: 'accent',
    background: { default: 'accentSecondary', hover: 'accentSecondaryHover' },
    boxShadow: { hover: 'containerMd', active: 'containerSm' },
    boxShadowColor: 'accentSecondaryHover',
  },
  secondary: {
    color: 'text',
    background: {
      default: 'foregroundSecondary',
      hover: 'foregroundSecondaryHover',
    },
    boxShadow: { hover: 'containerMd', active: 'containerSm' },
  },
  positive: {
    color: 'accentText',
    background: 'green',
    boxShadow: { hover: 'containerMd', active: 'containerSm' },
    boxShadowColor: 'green',
  },
  critical: {
    color: 'accentText',
    background: 'red',
    boxShadow: { hover: 'containerMd', active: 'containerSm' },
    boxShadowColor: 'red',
  },
})

export type Variant = keyof typeof variants
type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>
type Props = {
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  size?: keyof typeof sizes
  tabIndex?: NativeButtonProps['tabIndex']
  type?: 'button' | 'submit' | 'reset'
  variant?: Variant
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
      onClick,
      ...ariaProps
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const clickable = !disabled && !loading
    const boxProps = useBoxProps({
      ...(!clickable
        ? {
            background: 'foregroundSecondary',
            color: 'textSecondary',
            cursor: 'not-allowed',
          }
        : {}),
    })
    return (
      <Box
        as="button"
        ref={ref}
        {...sizes[size]}
        {...variants[variant]}
        {...boxProps}
        {...ariaProps}
        disabled={!clickable}
        tabIndex={tabIndex}
        transitionDuration={150}
        transitionTimingFunction="inOut"
        type={type}
        onClick={onClick}
      >
        <Text color="inherit" lineHeight="none" weight="medium">
          {children}
        </Text>
      </Box>
    )
  },
)
