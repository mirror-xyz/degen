import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Props as ButtonProps } from '../Button/Button'
import { Spinner } from '../Spinner'
import * as styles from './styles.css'

type Props = {
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  /** Text displayed on button */
  buttonText: string
} & Pick<ButtonProps, 'onClick' | 'width' | 'loading'>

export const ButtonCard = ({
  prefix,
  suffix,
  width,
  buttonText,
  children,
  onClick,
  loading,
}: React.PropsWithChildren<Props>) => {
  return (
    <Box width={width}>
      <Box className={styles.card}>
        {prefix && <Box marginRight="4">{prefix}</Box>}
        <Box>{children}</Box>
        {suffix && <Box marginLeft="4">{suffix}</Box>}
      </Box>
      <Box as="button" className={styles.button} onClick={onClick}>
        {buttonText}
        {loading && (
          <Box marginLeft="4">
            <Spinner color="current" />
          </Box>
        )}
      </Box>
    </Box>
  )
}
