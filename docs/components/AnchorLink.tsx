import * as React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

type Props = NavLinkProps & {
  scrollToAnchor?: (anchor: string) => void
}

export const AnchorLink = ({
  to,
  ...props
}: React.PropsWithChildren<Props>) => {
  const hash = (to as string).match(/(#.+)$/)?.[1] || ''

  return (
    <NavLink
      to={to}
      {...props}
      isActive={(_, location) =>
        !!(hash && decodeURIComponent(location.hash) === hash)
      }
      onClick={() => AnchorLink.scrollToAnchor(hash.substring(1))}
    />
  )
}

AnchorLink.scrollToAnchor = (anchor: string) => {
  if (!anchor) return
  // wait for dom update
  window.requestAnimationFrame(() => {
    const elm = document.getElementById(decodeURIComponent(anchor))
    // compatible in Edge
    if (elm) window.scrollTo(0, getElmScrollPosition(elm) - 20)
  })
}

const getElmScrollPosition = (elm: HTMLElement): number =>
  elm.offsetTop +
  (elm.offsetParent ? getElmScrollPosition(elm.offsetParent as HTMLElement) : 0)
