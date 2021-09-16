import * as React from 'react'

import { ReactNodeNoStrings } from '~/types'
import { Box, BoxProps } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>

type BaseProps = {
  children?: React.ReactNode
  center?: true
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

export type PropsWithTone = {
  variant?: 'highlight' | 'primary'
  tone?: styles.Tone
}

export type PropsWithoutTone = {
  variant?: styles.Variant
}

type Props = BaseProps & (PropsWithTone | PropsWithoutTone)

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
      ...props
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    let tone: styles.Tone | undefined
    if ('tone' in props) tone = props.tone
    else tone = 'accent'

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
      >
        {icon && <Box {...getCenterProps(center, size, 'left')}>{icon}</Box>}

        <Text color="inherit" ellipsis lineHeight="snug" weight="medium">
          {children}
        </Text>

        {loading && (
          <Box {...getCenterProps(center, size, 'right')}>
            <Spinner tone="current" />
          </Box>
        )}
      </Box>
    )
  },
)

Button.displayName = 'Button'
