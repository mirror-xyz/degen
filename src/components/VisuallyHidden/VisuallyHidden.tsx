import * as React from 'react'

import * as styles from './styles.css'

type Props = {
  as?: 'div' | 'span'
  children: React.ReactNode
}

export const VisuallyHidden = ({ as: Comp = 'div', children }: Props) => {
  return <Comp className={styles.visuallyHidden}>{children}</Comp>
}
