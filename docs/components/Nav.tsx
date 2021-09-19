import * as React from 'react'
import { Link, RouteProps } from 'react-router-dom'

import { Box } from '../../src'

type NavItem =
  | {
      label: string
      path: string
      activeIfMatch?: string | string[] | RouteProps
    }
  | {
      label: string
      children: NavItem[]
    }

type Props = {
  items: NavItem[]
}

export const Nav = ({ items }: Props) => {
  return <Box>{render(items)}</Box>
}

const render = (items: Props['items']) =>
  items.map((item) => {
    if ('path' in item) {
      const isInternalLink = item.path.startsWith('/')
      if (isInternalLink)
        return (
          <Link key={item.path} to={item.path}>
            {item.label}
          </Link>
        )
      else
        return (
          <a
            href={item.path}
            key={item.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        )
    }
    return (
      <Box key={item.label}>
        {item.label !== '/' && <Box>{item.label}</Box>}
        {render(item.children)}
      </Box>
    )
  })
