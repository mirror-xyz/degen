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
  /** Centers text and reserves space for icon and spinner */
  center?: true
  children: NativeButtonProps['children']
  /** Marks as unusable */
  disabled?: true
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: true
  /** Constrains button to specific shape */
  shape?: styles.Shape
  /** Sets dimensions and layout  */
  size?: styles.Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
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
      prefix,
      loading,
      shape,
      size = 'medium',
      suffix,
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
      childContent = loading ? <Spinner color="current" /> : labelContent
    } else {
      childContent = (
        <>
          {prefix && (
            <Box {...getCenterProps(center, size, 'left')}>{prefix}</Box>
          )}
          {labelContent}

          {(loading || suffix) && (
            <Box {...getCenterProps(center, size, 'right')}>
              {loading ? <Spinner color="current" /> : suffix}
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
