import * as React from 'react'
import { Link, RouteProps } from 'react-router-dom'

import { Box } from '../../../src'
import { SideNavsContext } from '../createTheme'

type Props = {
  sideNavsData: readonly MenuConfig[] | null | undefined
}

export const Navigation = ({ sideNavsData }: Props) => {
  const subMenuKeys: string[] = []
  const menu = sideNavsData && renderMenu(sideNavsData, subMenuKeys)

  return <div>{sideNavsData && <Box>{menu}</Box>}</div>
}

export interface DefaultSideNavsOpts {
  groupConfig: {
    [groupKey: string]: {
      [subGroupKey: string]: {
        label?: string
        order?: number
      }
    }
  }
}

export const defaultSideNavs = (
  { loadState, staticData }: SideNavsContext,
  opts?: DefaultSideNavsOpts,
): MenuConfig[] | null => {
  const currentGroupInfo = getPageGroupInfo(
    loadState.routePath,
    staticData[loadState.routePath],
  )

  const groups = getGroups(staticData)
  // groupKey of the current page
  const groupKey = (() => {
    // infer the group of the current page.
    // currentGroupInfo.group may be wrong because:
    // if there is also pages like /guide/start ,
    // then /guide should not be grouped with /faq .
    // instead, /guide should be moved to the "guide" group
    if (currentGroupInfo.group === '/' && groups[currentGroupInfo.pageName]) {
      return currentGroupInfo.pageName
    }
    return currentGroupInfo.group
  })()

  const subGroups = groups[groupKey] ?? {}

  const result: MenuConfig[] = []

  Object.entries(subGroups)
    .sort(([subGroupKeyA], [subGroupKeyB]) => {
      // pages with '/' subGroup are put afront
      if (subGroupKeyA === '/') return -1
      if (subGroupKeyB === '/') return 1
      const orderA = getGroupConfig(groupKey, subGroupKeyA)?.order ?? 1
      const orderB = getGroupConfig(groupKey, subGroupKeyB)?.order ?? 1
      if (orderA !== orderB) return orderA - orderB
      return subGroupKeyA.localeCompare(subGroupKeyB)
    })
    .map(([subGroupKey, pages]) => {
      if (subGroupKey === '/') {
        pages
          .sort((pageA, pageB) =>
            sortPages(
              pageA.pageStaticData,
              pageB.pageStaticData,
              pageA.pagePath,
              pageB.pagePath,
            ),
          )
          // pages with path params should not be showed in sideNav
          .filter((page) => !page.pagePath.includes('/:'))
          .forEach((page) => {
            const label =
              getStaticDataValue(page.pageStaticData, 'title') ?? page.pageName
            result.push({
              label,
              path: page.pagePath,
            })
          })
        return
      }
      const groupLabel =
        getGroupConfig(groupKey, subGroupKey)?.label ?? subGroupKey

      const subGroupItems = pages
        .sort((pageA, pageB) =>
          sortPages(
            pageA.pageStaticData,
            pageB.pageStaticData,
            pageA.pagePath,
            pageB.pagePath,
          ),
        )
        // pages with path params should not be showed in sideNav
        .filter((page) => !page.pagePath.includes('/:'))
        .map((page) => {
          const label =
            getStaticDataValue(page.pageStaticData, 'title') ?? page.pageName
          return {
            label,
            path: page.pagePath,
          }
        })
      if (subGroupItems.length > 0)
        result.push({
          group: groupLabel,
          children: subGroupItems,
        })
    })
  return result

  function getGroupConfig(groupKey: string, subGroupKey: string) {
    return opts?.groupConfig?.[groupKey]?.[subGroupKey]
  }
}

const removeStartSlash = (pagePath: string) => pagePath.replace(/^\//, '')

const getStaticDataValue = (pageStaticData: any, key: string) =>
  pageStaticData?.[key] ?? pageStaticData?.main?.[key]

const sortPages = (
  pageStaticDataA: any,
  pageStaticDataB: any,
  pathA: string,
  pathB: string,
) => {
  const orderA = Number(getStaticDataValue(pageStaticDataA, 'order') ?? 1)
  const orderB = Number(getStaticDataValue(pageStaticDataB, 'order') ?? 1)
  if (!Number.isNaN(orderA) && !Number.isNaN(orderB) && orderA !== orderB)
    return orderA - orderB
  return pathA.localeCompare(pathB)
}

// map groups -> subgroups -> pages
type Groups = {
  [groupKey: string]: {
    [subGroupKey: string]: {
      pagePath: string
      pageStaticData: any
      pageName: string
    }[]
  }
}

const getGroups = (staticData: any) => {
  const groups: Groups = {}
  function ensureGroup(
    group: string,
  ): Record<
    string,
    { pagePath: string; pageStaticData: any; pageName: string }[]
  >
  function ensureGroup(
    group: string,
    subGroup: string,
  ): { pagePath: string; pageStaticData: any; pageName: string }[]
  function ensureGroup(group: string, subGroup?: string) {
    const subGroups = (groups[group] ||= {})
    if (!subGroup) return subGroups
    return (subGroups[subGroup] ||= [])
  }

  Object.entries(staticData).forEach(([pagePath, pageStaticData]) => {
    if (pagePath === '/404') return
    const pageGroupInfo = getPageGroupInfo(pagePath, pageStaticData)
    ensureGroup(pageGroupInfo.group, pageGroupInfo.subGroup).push({
      pagePath,
      pageStaticData,
      pageName: pageGroupInfo.pageName,
    })
  })

  const rootGroup = groups['/']?.['/']
  if (rootGroup) {
    const filtered = rootGroup.filter((page) => {
      if (page.pageName === '/') return true
      if (groups[page.pageName]) {
        // it is explicit grouped
        if (getStaticDataValue(page.pageStaticData, 'group')) return true
        // if there is also pages like /guide/start
        // then /guide should not be grouped with /faq
        // instead, /guide should be moved to the "guide" group
        ensureGroup(page.pageName, '/').push(page)
        return false
      }
      return true
    })
    groups['/']['/'] = filtered
  }

  return groups
}

const getPageGroupInfo = (
  pagePath: string,
  pageStaticData: any,
): {
  group: string
  subGroup: string
  pageName: string
} => {
  if (!pagePath.startsWith('/')) throw new Error('getPageGroup assertion fail')
  const seg = removeStartSlash(pagePath).split('/')
  let group: string = getStaticDataValue(pageStaticData, 'group')
  let subGroup: string = getStaticDataValue(pageStaticData, 'subGroup')
  // used as default title
  const pageName: string = seg[seg.length - 1] || '/'
  if (seg.length === 1) {
    group ||= '/'
    subGroup ||= '/'
  } else if (seg.length === 2) {
    group ||= seg[0]
    subGroup ||= '/'
  } else if (seg.length >= 3) {
    group ||= seg[0]
    subGroup ||= seg[1]
  } else {
    throw new Error('getPageGroup assertion fail')
  }
  return {
    group,
    subGroup,
    pageName,
  }
}

export type MenuConfig =
  | {
      readonly label: string
      /**
       * The url.
       * @example 'https://www.google.com/'
       */
      readonly href: string
      readonly icon?: React.ReactNode
    }
  | {
      readonly label: string
      /**
       * The path in the current webapp.
       * @example '/posts/hello-world'
       */
      readonly path: string
      readonly icon?: React.ReactNode
      /**
       * The menu item will show an "active" state
       * if it matches with current browsing path.
       */
      readonly activeIfMatch?: string | string[] | RouteProps
    }
  | {
      /**
       * The label of the subnav
       */
      readonly subMenu: string
      readonly children: ReadonlyArray<MenuConfig>
      readonly icon?: React.ReactNode
      readonly activeIfMatch?: string | string[] | RouteProps
    }
  | {
      /**
       * The label of the nav group
       */
      readonly group: string
      readonly children: ReadonlyArray<MenuConfig>
    }

const renderMenu = (
  menuConfig: ReadonlyArray<MenuConfig>,
  collectMenuKeys: string[] = [],
) => {
  return menuConfig.map((item) => {
    if ('href' in item) {
      return (
        <a
          href={item.href}
          key={item.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.label}
        </a>
      )
    }
    if ('path' in item) {
      return (
        <Link key={item.path} to={item.path}>
          {item.label}
        </Link>
      )
    }
    if ('subMenu' in item) {
      collectMenuKeys.push(item.subMenu)
      return <Box key={item.subMenu}>{renderMenu(item.children)}</Box>
    }
    if ('group' in item) {
      return <Box key={item.group}>{renderMenu(item.children)}</Box>
    }

    throw new Error(`invalid menu config`)
  })
}
