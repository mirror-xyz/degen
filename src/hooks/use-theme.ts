import * as React from 'react'

import { ThemeContext, ThemeContextProps } from '~/components'

export const useTheme = () => {
  const context = React.useContext(ThemeContext) as ThemeContextProps
  if (context === undefined)
    throw Error('useTheme must be used within ThemeProvider')
  return context
}
