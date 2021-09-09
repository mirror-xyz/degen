import * as React from 'react'

import { css, theme } from '~/styles'

type Props = {
  children: React.ReactNode
}

const styles = css({
  borderWidth: theme.borderWidths['0'],
  clip: 'rect(0, 0, 0, 0)',
  height: theme.space.px,
  margin: theme.space['-px'],
  overflow: 'hiden',
  padding: theme.space['0'],
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: theme.space.px,
})

export const VisuallyHidden = ({ children }: Props) => {
  return <div className={styles()}>{children}</div>
}
