import * as React from 'react'

import { Atoms } from '~/css'
import { Box } from '../Box'
import * as styles from './styles.css'

type Props = {
  align?: Atoms['textAlign']
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
  transform?: Atoms['textTransform']
  weight?: Atoms['fontWeight']
  whiteSpace?: Atoms['whiteSpace']
} & styles.Variants

export const Text = React.forwardRef(
  (
    {
      align,
      as = 'div',
      children,
      color = 'foreground',
      ellipsis,
      font = 'sans',
      letterSpacing,
      lineHeight,
      size = 'base',
      transform,
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
          ellipsis: ellipsis ? true : undefined,
        })}
        color={color}
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
        ref={ref}
        textAlign={align}
        textTransform={transform}
        whiteSpace={whiteSpace}
      >
        {children}
      </Box>
    )
  },
)

Text.displayName = 'Text'
