import * as React from 'react'
import NextLink from 'next/link'

import { Box } from 'degen/components'

type NextLinkProps = Parameters<typeof NextLink>[0]

type Props = {
  as?: NextLinkProps['as']
  className?: string
  href: string
}

export const Link = ({
  as,
  children,
  className,
  href,
}: React.PropsWithChildren<Props>) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <NextLink
        as={as}
        href={href}
        passHref
        prefetch={canPrefetch(href) ? undefined : false}
      >
        <Box as="a" className={className}>
          {children}
        </Box>
      </NextLink>
    </>
  )
}
const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) return false
  return true
}
