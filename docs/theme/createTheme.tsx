import * as React from 'react'
import type {
  LoadState,
  PagesLoaded,
  ThemeProps,
} from 'vite-plugin-react-pages/clientTypes'
import { useStaticData } from 'vite-plugin-react-pages/client'
import { useLocation } from 'react-router-dom'

import { Layout } from './Layout'
import { ThemeConfigContext, ThemePropsContext } from './context'

import { AnchorLink, Demo, Mdx, MenuConfig } from './components'

export type SideNavsContext = {
  readonly loadState: LoadState
  readonly loadedData: PagesLoaded
  readonly staticData: Record<string, any>
}

export type ThemeConfig = {
  /* Logo at top bar */
  logo?: React.ReactNode
  /**
   * Logo link path
   * @defaultValue "/"
   */
  logoLink?: string | null
  /* Side menu */
  sideNavs?:
    | ReadonlyArray<MenuConfig>
    | ((ctx: SideNavsContext) => ReadonlyArray<MenuConfig> | null | undefined)
}

export const createTheme = (themeConfig: ThemeConfig) => {
  const ThemeComp = (props: ThemeProps) => {
    const { loadState, loadedData } = props
    const staticData = useStaticData()

    const location = useLocation()
    React.useEffect(() => {
      // scroll to anchor after page component loaded
      if (loadState.type === 'loaded') {
        if (location.hash) {
          AnchorLink.scrollToAnchor(decodeURIComponent(location.hash.slice(1)))
        }
      }
    }, [loadState, loadedData])

    if (loadState.type === 'loading') return <Layout />

    if (loadState.type === 'load-error') {
      const errMsg = loadState.error?.message
      return (
        <Layout>
          <h1>Load Error</h1>
          {errMsg && <p>{errMsg}</p>}
        </Layout>
      )
    }

    const pageData = loadedData[loadState.routePath]

    if (loadState.type === '404' || !pageData) {
      const Comp404 = loadedData['/404']?.main?.default
      return <Layout>{Comp404 ? <Comp404 /> : <p>Page not found.</p>}</Layout>
    }

    const pageStaticData = staticData[loadState.routePath]
    const body = Object.entries(pageData).map(([key, dataPart], _index) => {
      const ContentComp = (dataPart as any).default
      const pageStaticDataPart = pageStaticData?.[key]
      const content = (() => {
        if (pageStaticDataPart?.sourceType === 'md')
          return (
            <Mdx>
              <ContentComp />
            </Mdx>
          )
        if (dataPart?.isDemo)
          return <Demo style={{ margin: '16px 45px' }} {...dataPart} />
        return <ContentComp />
      })()
      return <React.Fragment key={key}>{content}</React.Fragment>
    })

    return <Layout>{body}</Layout>
  }

  return withThemeProvider(ThemeComp)

  function withThemeProvider(Component: React.FC<ThemeProps>) {
    const HOC = (props: React.PropsWithChildren<ThemeProps>) => {
      return (
        <ThemeConfigContext.Provider value={themeConfig}>
          <ThemePropsContext.Provider value={props}>
            <Component {...props} />
          </ThemePropsContext.Provider>
        </ThemeConfigContext.Provider>
      )
    }
    return HOC
  }
}
