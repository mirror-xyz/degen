import * as React from 'react'

import { ReactNodeNoStrings } from '~/types'

import { Box, BoxProps } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>

type AriaProps = {
  'aria-controls'?: NativeButtonProps['aria-controls']
  'aria-expanded'?: NativeButtonProps['aria-expanded']
  'aria-describedby'?: NativeButtonProps['aria-describedby']
}

type BaseProps = AriaProps & {
  children: React.ReactNode
  disabled?: true
  loading?: boolean
  icon?: ReactNodeNoStrings
  shape?: styles.Shape
  size?: styles.Size
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  width?: BoxProps['width']
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type PropsWithTone = BaseProps & {
  variant?: 'highlight' | 'primary'
  tone?: styles.Tone
}
type PropsWithoutTone = BaseProps & { variant?: styles.Variant }
type PropsWithCenter = BaseProps & {
  center?: true
  size?: 'lg'
}

type Props = (PropsWithTone | PropsWithoutTone) & PropsWithCenter

export const Button = React.forwardRef(
  (
    {
      disabled,
      loading,
      center,
      children,
      icon,
      shape,
      size = 'lg',
      tabIndex,
      type,
      variant = 'highlight',
      width,
      onClick,
      ...rest
    }: React.PropsWithChildren<Props>,
    ref: React.Ref<HTMLElement>,
  ) => {
    const { tone = 'accent', ...ariaProps } = rest as PropsWithTone
    return (
      <Box
        as="button"
        className={styles.variants({
          disabled,
          center,
          shape,
          size,
          tone,
          variant,
        })}
        disabled={disabled}
        ref={ref}
        tabIndex={tabIndex}
        type={type}
        width={width}
        onClick={onClick}
        {...(ariaProps as AriaProps)}
      >
        {icon && <Box {...getCenterProps(center, 'left')}>{icon}</Box>}

        <Text color="inherit" ellipsis lineHeight="snug" weight="medium">
          {children}
        </Text>

        {loading && (
          <Box {...getCenterProps(center, 'right')}>
            <Spinner />
          </Box>
        )}
      </Box>
    )
  },
)

Button.displayName = 'Button'
