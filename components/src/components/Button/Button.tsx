import * as React from 'react'

import { ReactNodeNoStrings } from '~/types'
import { Atoms } from '~/css'
import { Box } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>

type BaseProps = {
  center?: true
  children: NativeButtonProps['children']
  disabled?: true
  icon?: ReactNodeNoStrings
  loading?: true
  shape?: styles.Shape
  size?: styles.Size
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  variant?: styles.Variant
  width?: Atoms['width']
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type WithoutTone = {
  tone?: never
  variant?: styles.Variant
}

type WithTone = {
  tone?: styles.Tone
  variant?: 'highlight' | 'primary'
}

type Props = BaseProps & (WithTone | WithoutTone)

export const Button = React.forwardRef(
  (
    {
      center,
      children,
      disabled,
      icon,
      loading,
      shape,
      size = 'medium',
      tabIndex,
      tone = 'accent',
      type,
      variant = 'highlight',
      width,
      onClick,
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = (
      <Text color="inherit" ellipsis size="inherit" weight="medium">
        {children}
      </Text>
    )

    let childContent: ReactNodeNoStrings
    if (shape) {
      childContent = loading ? <Spinner tone="current" /> : labelContent
    } else {
      childContent = (
        <>
          {icon && <Box {...getCenterProps(center, size, 'left')}>{icon}</Box>}
          {labelContent}
          {loading && (
            <Box {...getCenterProps(center, size, 'right')}>
              <Spinner tone="current" />
            </Box>
          )}
        </>
      )
    }

    return (
      <Box
        as="button"
        className={styles.variants({
          center,
          disabled,
          shape,
          size,
          tone,
          variant,
        })}
        disabled={disabled}
        ref={ref}
        tabIndex={tabIndex}
        type={type}
        width={width ?? 'max'}
        onClick={onClick}
      >
        {childContent}
      </Box>
    )
  },
)

Button.displayName = 'Button'
