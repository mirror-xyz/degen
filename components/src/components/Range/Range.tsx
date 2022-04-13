import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'

type Props = Pick<
  BoxProps,
  | 'marginX'
  | 'marginY'
  | 'width'
  | 'flex'
  | 'flexBasis'
  | 'flexGrow'
  | 'flexShrink'
> &
  React.InputHTMLAttributes<HTMLInputElement>

export const Range = React.forwardRef(
  (
    {
      width = 'full',
      marginX = '0',
      marginY = '0',
      step,
      min,
      max,
      value,
      onChange,
      form,
      name,
      disabled,
      flex,
      flexBasis,
      flexGrow,
      flexShrink,
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <Box
        as="input"
        className={styles.range}
        disabled={disabled}
        flex={flex}
        flexBasis={flexBasis}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        form={form}
        margin="0"
        marginX={marginX}
        marginY={marginY}
        max={max}
        min={min}
        name={name}
        ref={ref}
        step={step}
        type="range"
        value={value}
        width={width}
        onChange={onChange}
      />
    )
  },
)

Range.displayName = 'Range'
