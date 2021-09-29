import * as React from 'react'

import { Atoms } from '~/theme'
import { Box } from '../Box'
import * as styles from './styles.css'

type Props = {
  as?:
    | 'code'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'p'
    | 'span'
  children?: React.ReactNode
  color?: Atoms['color']
  font?: Atoms['fontFamily']
  letterSpacing?: Atoms['letterSpacing']
  lineHeight?: Atoms['lineHeight']
  size?: Atoms['fontSize']
  weight?: Atoms['fontWeight']
  whiteSpace?: Atoms['whiteSpace']
} & styles.Variants

export const Text = React.forwardRef(
  (
    {
      as = 'div',
      children,
      color = 'foreground',
      ellipsis,
      font = 'sans',
      letterSpacing,
      lineHeight,
      size,
      variant,
      weight,
      whiteSpace,
    }: Props,
    ref: React.Ref<HTMLElement>,
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
