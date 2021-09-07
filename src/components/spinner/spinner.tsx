import * as React from 'react'

import { Box, BoxProps, createVariants, useBoxProps } from '../box'
import { VisuallyHidden } from '../visually-hidden'
import { spinner } from './styles.css'

const variants = createVariants({
  md: {
    height: 6,
    width: 6,
    strokeWidth: 2,
  },
  lg: {
    color: 'textSecondary',
    height: 16,
    width: 16,
    strokeWidth: 1.5,
  },
})

type Props = {
  accessibilityLabel?: string
  color?: BoxProps['color']
  variant?: keyof typeof variants
}

export const Spinner = React.forwardRef(
  (
    { accessibilityLabel, color, variant = 'md' }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const boxProps = useBoxProps({ color })
    return (
      <Box className={spinner} ref={ref} {...variants[variant]} {...boxProps}>
        {accessibilityLabel && (
          <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
        )}
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="10"
            strokeDasharray="42"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            fill="none"
            opacity="0.25"
            r="10"
            strokeLinecap="round"
          />
        </svg>
      </Box>
    )
  },
)
