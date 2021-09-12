import * as React from 'react'

import { Box } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
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
  size?: styles.Size
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type PropsWithTone = BaseProps & {
  variant?: 'highlight' | 'primary'
  tone?: styles.Tone
}
type PropsWithoutTone = BaseProps & { variant?: styles.Variant }

type Props = PropsWithTone | PropsWithoutTone

export const Button = React.forwardRef(
  (
    {
      disabled,
      loading,
      children,
      size = 'lg',
      tabIndex,
      type,
      variant = 'highlight',
      onClick,
      ...rest
    }: React.PropsWithChildren<Props>,
    ref: React.Ref<HTMLElement>,
  ) => {
    const { tone = 'accent', ...ariaProps } = rest as PropsWithTone
    return (
      <Box
        as="button"
        className={styles.root({ disabled, size, tone, variant })}
        disabled={disabled}
        ref={ref}
        tabIndex={tabIndex}
        type={type}
        onClick={onClick}
        {...(ariaProps as AriaProps)}
      >
        <Text color="inherit" ellipsis lineHeight="none" weight="medium">
          {children}
        </Text>
        {loading && <Spinner />}
      </Box>
    )
  },
)
