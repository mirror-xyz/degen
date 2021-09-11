import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

type Props = {
  as?: 'div' | 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  color?: BoxProps['color']
  ellipsis?: boolean
  font?: BoxProps['fontFamily']
  letterSpacing?: BoxProps['letterSpacing']
  lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize']
  variant?: styles.Variant
  weight?: BoxProps['fontWeight']
  whiteSpace?: BoxProps['whiteSpace']
}

export const Text = React.forwardRef(
  (
    {
      as = 'div',
      children,
      color,
      ellipsis,
      font,
      letterSpacing,
      lineHeight,
      size,
      variant,
      weight,
      whiteSpace,
    }: React.PropsWithChildren<Props>,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box
        as={as}
        className={styles.root({ variant, ...(ellipsis ? { ellipsis } : {}) })}
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
