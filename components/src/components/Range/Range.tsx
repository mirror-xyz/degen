import { assignInlineVars } from '@vanilla-extract/dynamic'
import * as React from 'react'

import { Box, BoxProps } from '../Box'
import * as styles from './styles.css'
import { vars as globalVars } from '../../css'
import { ThemeVars } from '../../css/vars.css'

type Props = {
  width?: Extract<BoxProps['width'], keyof ThemeVars['space']>
} & Pick<BoxProps, 'marginX' | 'marginY'> &
  React.InputHTMLAttributes<HTMLInputElement>

export const Range = React.forwardRef(
  (
    {
      width = 'full',
      marginX = '0',
      marginY = '0',
      step = 'any',
      min,
      max,
      value,
      onChange,
      form,
      name,
      disabled,
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const style = React.useMemo(() => {
      return assignInlineVars(styles.vars, {
        trackWidth: globalVars.space[width],
      })
    }, [width])

    return (
      <Box
        as="input"
        className={styles.range}
        disabled={disabled}
        form={form}
        margin="0"
        marginX={marginX}
        marginY={marginY}
        max={max}
        min={min}
        name={name}
        ref={ref}
        step={step}
        style={style}
        type="range"
        value={value}
        onChange={onChange}
      />
    )
  },
)

Range.displayName = 'Range'
