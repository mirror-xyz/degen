import * as React from 'react'
import { useStaticData } from 'vite-plugin-react-pages/client'

import { ThemeConfigContext, ThemePropsContext } from './context'
import { SideNavsContext } from './createTheme'

import { Navigation, defaultSideNavs } from './components'

import { Box } from '../../src'
import { default as FrameComponent } from '../../src/playroom/FrameComponent'

type Props = {
  children?: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const { sideNavs } = React.useContext(ThemeConfigContext)
  const themeProps = React.useContext(ThemePropsContext)
  const staticData = useStaticData()

  const sideNavsData = React.useMemo(() => {
    const themeContext: SideNavsContext = { ...themeProps, staticData }
    if (typeof sideNavs === 'function') return sideNavs(themeContext)
    if (Array.isArray(sideNavs)) return sideNavs
    return defaultSideNavs(themeContext)
  }, [themeProps])

  return (
    <FrameComponent>
      <Box>
        <Box>
          {sideNavsData && (
            <Box>
              <Navigation sideNavsData={sideNavsData} />
            </Box>
          )}
          <Box>{children}</Box>
        </Box>
      </Box>
    </FrameComponent>
  )
}
