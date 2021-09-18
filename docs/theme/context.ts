import * as React from 'react'
import { ThemeProps } from 'vite-plugin-react-pages/clientTypes'

import { ThemeConfig } from './createTheme'

export const ThemeConfigContext = React.createContext<ThemeConfig>({})

export const ThemePropsContext = React.createContext<ThemeProps>({
  loadState: { type: 'loading', routePath: '/' },
  loadedData: {},
})
