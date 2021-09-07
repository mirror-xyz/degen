import * as React from 'react'

import { Box, createVariants, useBoxProps } from '../box'
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

const variants = createVariants({
  highlight: {
    color: 'accentText',
    background: 'accent',
  },
  primary: {
    color: 'accent',
    background: { base: 'accentSecondary', hover: 'accentSecondaryHover' },
  },
  secondary: {
    color: 'text',
    background: {
      base: 'foregroundSecondary',
      hover: 'foregroundSecondaryHover',
    },
  },
  tertiary: {
    color: 'textSecondary',
    background: {
      base: 'foregroundTertiary',
      hover: 'foregroundSecondary',
    },
  },
  transparent: {
    color: 'text',
    background: {
      hover: 'foregroundSecondaryHover',
    },
  },
  transparentSecondary: {
    color: 'textSecondary',
    background: {
      hover: 'foregroundSecondaryHover',
    },
  },
  positive: {
    color: 'accentText',
    background: 'green',
  },
  critical: {
    color: 'accentText',
    background: 'red',
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
        alignItems="center"
        as="button"
        className={styles.boxShadowVariants[variant]}
        disabled={!clickable}
        display="flex"
        ref={ref}
        tabIndex={tabIndex}
        transitionDuration={150}
        transitionProperty="default"
        transitionTimingFunction="inOut"
        type={type}
        onClick={onClick}
        {...sizes[size]}
        {...variants[variant]}
        {...boxProps}
        {...ariaProps}
      >
        <Text color="inherit" lineHeight="none" weight="medium">
          {children}
        </Text>
        {loading && <Spinner />}
      </Box>
    )
  },
)
