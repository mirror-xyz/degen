import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'

type Props = {
  accessibilityLabel?: string
  tone?: BoxProps['color']
  size?: styles.Size
}

export const Spinner = React.forwardRef(
  (
    { accessibilityLabel, tone, size = 'md' }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box className={styles.root({ size })} color={tone} ref={ref}>
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

Spinner.displayName = 'Spinner'
