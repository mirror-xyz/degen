import * as React from 'react'
import { ThemeProps } from 'vite-plugin-react-pages/clientTypes'
import { useStaticData } from 'vite-plugin-react-pages/client'
import { useLocation } from 'react-router-dom'

import { Box } from '../src'
import FrameComponent from '../src/playroom/FrameComponent'
import { AnchorLink, MDXProvider, Nav } from './components'

const ThemeWrapper = ({ loadState, loadedData }: ThemeProps) => {
  const staticData = useStaticData()
  const location = useLocation()

  const navItems = React.useMemo(() => {
    const groups: Record<
      string,
      {
        label: string
        children: {
          path: string
          label: string
        }[]
      }
    > = {}

    Object.entries(staticData).forEach(([pagePath, pageStaticData]) => {
      if (
        pagePath === '/404' ||
        pageStaticData.hideInMenu ||
        pagePath.match(/\/:[^/]+/)
      )
        return

      const pathComponents = pagePath.replace(/^\//, '').split('/')
      const group =
        pageStaticData?.group ??
        pageStaticData?.main?.group ??
        pathComponents.length === 1
          ? '/'
          : pathComponents[0]
      const item = {
        path: pagePath,
        label:
          pageStaticData?.main?.title ||
          pathComponents[pathComponents.length - 1],
      }

      if (group in groups) {
        groups[group].children.push(item)
      } else {
        groups[group] = {
          label: group,
          children: [item],
        }
      }
    })

    return Object.values(groups)
  }, [staticData])

  // Scroll to anchor after page component loaded
  React.useEffect(() => {
    if (loadState.type === 'loaded' && location.hash)
      AnchorLink.scrollToAnchor(decodeURIComponent(location.hash.slice(1)))
  }, [loadState, loadedData, location.hash])
  const pageData = loadedData[loadState.routePath]

  let content: React.ReactNode
  if (loadState.type === 'loading') content = <div />
  else if (loadState.type === 'load-error') {
    const errMsg = loadState.error?.message
    content = (
      <Box>
        <h1>Load Error</h1>
        {errMsg && <p>{errMsg}</p>}
      </Box>
    )
  } else if (loadState.type === '404' || !pageData) {
    const Error = loadedData['/404']?.main?.default
    content = Error ? <Error /> : <Box>Page not found</Box>
  } else {
    content = Object.entries(pageData).map(([key, dataPart]) => {
      const Content = dataPart.default
      return <Content key={key} />
    })
  }

  return (
    <FrameComponent>
      <Box>
        <Nav items={navItems} />
      </Box>
      <MDXProvider>
        <Box>{content}</Box>
      </MDXProvider>
    </FrameComponent>
  )
}

export default ThemeWrapper
