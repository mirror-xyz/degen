import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Props as ButtonProps } from '../Button/Button'
import { Spinner } from '../Spinner'
import * as styles from './styles.css'

type BaseProps = {
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  /** Text displayed on button */
  buttonText: string
} & Pick<ButtonProps, 'onClick' | 'width' | 'loading' | 'disabled' | 'as'>

type WithAnchor = {
  as?: 'a'
} & Pick<JSX.IntrinsicElements['a'], 'href' | 'rel' | 'target'>

type WithoutAnchor = {
  as?: 'button'
}

export type Props = BaseProps & (WithAnchor | WithoutAnchor)

export const ButtonCard = ({
  prefix,
  suffix,
  width,
  buttonText,
  children,
  loading,
  ...buttonProps
}: React.PropsWithChildren<Props>) => {
  return (
    <Box width={width}>
      <Box className={styles.card}>
        {prefix && <Box marginRight="16px">{prefix}</Box>}
        <Box>{children}</Box>
        {suffix && <Box marginLeft="16px">{suffix}</Box>}
      </Box>
      <Box
        as={buttonProps.as || 'button'}
        className={styles.variants({ disabled: !!buttonProps.disabled })}
        {...buttonProps}
      >
        {buttonText}
        {loading && (
          <Box marginLeft="16px">
            <Spinner color="current" />
          </Box>
        )}
      </Box>
    </Box>
  )
}
