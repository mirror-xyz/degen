import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box, BoxProps } from '../Box'
import { Spinner } from '../Spinner'
import { Text } from '../Text'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type BaseProps = {
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
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
  variant?: styles.Variant
} & Pick<
  JSX.IntrinsicElements['button'],
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'children'
  | 'disabled'
  | 'type'
  | 'tabIndex'
> &
  Pick<BoxProps, 'width' | 'justifyContent'>

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
} & Pick<JSX.IntrinsicElements['a'], 'href' | 'rel' | 'target'>

type WithoutAnchor = {
  as?: 'button'
}

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithAnchor | WithoutAnchor)

export const Button = React.forwardRef(
  (
    {
      center,
      children,
      prefix,
      loading,
      shape,
      size = 'large',
      suffix,
      tone = 'accent',
      variant = 'primary',
      ...boxProps
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
        className={styles.variants({
          center,
          disabled: boxProps.disabled,
          shape,
          size,
          tone,
          variant,
        })}
        ref={ref}
        // Passed-through boxProps.
        // Note: Default values for boxProps need to be
        // assigned after the {...boxProps} spread below
        {...boxProps}
        as={boxProps.as ?? 'button'}
        justifyContent={boxProps.justifyContent ?? 'center'}
        width={boxProps.width ?? 'max'}
      >
        {childContent}
      </Box>
    )
  },
)

Button.displayName = 'Button'
