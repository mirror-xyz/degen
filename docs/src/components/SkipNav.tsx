import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
  SkipNavLinkProps,
} from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

import { Box } from 'degen/components'
import { vars } from 'degen/css'

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return (
    <Box
      as={ReachSkipNavLink}
      {...rest}
      style={{
        background: vars.colors.accent,
        color: vars.colors.accentText,
        fontFamily: vars.fonts.sans,
      }}
    >
      {children}
    </Box>
  )
}

export const SkipNavContent = ReachSkipNavContent
