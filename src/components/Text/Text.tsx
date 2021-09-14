import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

type Props = {
  as?: 'div' | 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: BoxProps['color']
  font?: BoxProps['fontFamily']
  letterSpacing?: BoxProps['letterSpacing']
  lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize']
  weight?: BoxProps['fontWeight']
  whiteSpace?: BoxProps['whiteSpace']
} & styles.Variants

export const Text = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      as = 'div',
      children,
      color = 'text',
      ellipsis,
      font = 'sans',
      letterSpacing,
      lineHeight,
      size,
      variant,
      weight,
      whiteSpace,
    },
    ref,
  ) => {
    return (
      <Box
        as={as}
        className={styles.variants({
          variant,
          ...(ellipsis ? { ellipsis } : {}),
        })}
        color={color}
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
        ref={ref}
        whiteSpace={whiteSpace}
      >
        {children}
      </Box>
    )
  },
)

Text.displayName = 'Text'
