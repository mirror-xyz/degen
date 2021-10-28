import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'

type Props = {
  children: ReactNodeNoStrings
  loading?: boolean
}

export const Context = React.createContext<boolean | undefined>(undefined)

export const SkeletonGroup = ({ children, loading }: Props) => {
  return <Context.Provider value={loading}>{children}</Context.Provider>
}
