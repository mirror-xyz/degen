import * as React from 'react'

import { ThemeContext } from './ThemeProvider'

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined)
    throw Error('useTheme must be used within ThemeProvider')
  return context
}
