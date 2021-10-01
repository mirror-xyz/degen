import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
  SkipNavLinkProps,
} from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

import { vars } from '~/theme'

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return (
    <ReachSkipNavLink
      {...rest}
      style={{
        background: vars.colors.foregroundSecondary,
        color: vars.colors.text,
        fontFamily: vars.fonts.sans,
      }}
    >
      {children}
    </ReachSkipNavLink>
  )
}

export const SkipNavContent = ReachSkipNavContent
