import * as React from 'react'

import { Box } from '../Box'
import * as styles from './styles.css'

export type Props = {
  as?: 'div' | 'span'
  label?: string
} & styles.Variants

export const Tag = ({
  as = 'div',
  children,
  hover,
  label,
  size = 'medium',
  tone = 'secondary',
}: React.PropsWithChildren<Props>) => {
  return (
    <Box
      as={as}
      className={styles.variants({ hover, size, tone })}
      lineHeight="normal"
    >
      {label && (
        <Box
          alignItems="center"
          as="label"
          borderRadius="full"
          className={styles.label}
          display="flex"
          height="full"
          paddingX="8px"
        >
          <span>{label}</span>
        </Box>
      )}
      <Box
        alignItems="center"
        as={as}
        display="flex"
        gap="4px"
        minWidth="0px"
        paddingX="8px"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return child
          }
          if (typeof child === 'string' || typeof child === 'number') {
            return (
              <Box
                as="span"
                display="block"
                overflow="hidden"
                style={{ textOverflow: 'ellipsis' }}
                whiteSpace="nowrap"
              >
                {child}
              </Box>
            )
          }
        })}
      </Box>
    </Box>
  )
}
