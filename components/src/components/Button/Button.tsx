import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box, BoxProps } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type NativeButtonProps = React.AllHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type BaseProps = {
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
  children: NativeButtonProps['children']
  /** Marks as unusable */
  disabled?: boolean
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: styles.Shape
  /** Sets dimensions and layout  */
  size?: styles.Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  variant?: styles.Variant
  width?: BoxProps['width']
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type WithTone = {
  tone?: styles.Tone
  variant?: 'primary' | 'secondary'
}

type WithoutTone = {
  tone?: never
  variant?: styles.Variant
}

type WithAnchor = {
  as?: 'a'
  href?: string
  rel?: NativeAnchorProps['rel']
  target?: NativeAnchorProps['target']
}

type WithoutAnchor = {
  as?: 'button'
  href?: never
  rel?: never
  target?: never
}

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithAnchor | WithoutAnchor)

export const Button = React.forwardRef(
  (
    {
      as = 'button',
      center,
      children,
      disabled,
      href,
      prefix,
      loading,
      rel,
      shape,
      size = 'medium',
      suffix,
      tabIndex,
      target,
      tone = 'accent',
      type,
      variant = 'primary',
      width,
      onClick,
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = (
      <Text color="inherit" ellipsis size="inherit" weight="semiBold">
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
        as={as}
        className={styles.variants({
          center,
          disabled,
          shape,
          size,
          tone,
          variant,
        })}
        disabled={disabled}
        href={href}
        ref={ref}
        rel={rel}
        tabIndex={tabIndex}
        target={target}
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
