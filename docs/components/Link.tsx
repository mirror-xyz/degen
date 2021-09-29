import * as React from 'react'
import NextLink from 'next/link'

type NextLinkProps = Parameters<typeof NextLink>[0]

type Props = {
  as?: NextLinkProps['as']
  className?: string
  external: true
  href: string
  passHref?: NextLinkProps['passHref']
}

export const Link = ({
  as,
  children,
  className,
  external,
  href,
  passHref,
}: React.PropsWithChildren<Props>) => {
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
        passHref={passHref}
        prefetch={canPrefetch(href) ? undefined : false}
      >
        {passHref ? children : <a className={className}>{children}</a>}
      </NextLink>
    </>
  )
}
const canPrefetch = (href: string) => {
  if (!href || !href.startsWith('/')) return false
  return true
}
