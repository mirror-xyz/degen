import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

type Props = {
  align?: BoxProps['textAlign']
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
  color?: BoxProps['color']
  font?: BoxProps['fontFamily']
  letterSpacing?: BoxProps['letterSpacing']
  lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize']
  transform?: BoxProps['textTransform']
  weight?: BoxProps['fontWeight']
  whiteSpace?: BoxProps['whiteSpace']
  wordBreak?: BoxProps['wordBreak']
} & styles.Variants

export const Text = React.forwardRef(
  (
    {
      align,
      as = 'div',
      children,
      color = 'text',
      ellipsis,
      font = 'sans',
      letterSpacing,
      lineHeight,
      size,
      transform,
      variant,
      weight,
      whiteSpace,
      wordBreak,
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
        wordBreak={wordBreak}
      >
        {children}
      </Box>
    )
  },
)

Text.displayName = 'Text'
