import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import NextImage from 'next/image'

import { Box, Button, Stack, Text } from 'degen/components'

import { createGitHubLink } from '~/utils/github'
import { useIsMounted } from '~/utils/isMounted'
import * as styles from '~/styles/utils.css'

import { Link } from './Link'
import { ThemeSwitcher } from './ThemeSwitcher'

type Link = { name: string; route: string }

export type Props = {
  links: { name: string; links: Link[] }[]
}

type State = {
  open: boolean
}

const initialState = {
  open: false,
}

export const Nav = ({ links }: Props) => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [state, setState] = React.useState<State>(initialState)

  // Close menu on route change
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const handleRouteChange = () => setState((x) => ({ ...x, open: false }))
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Box flexDirection="column" height="full">
      <Box paddingBottom={{ md: '20px' }}>
        <Stack
          align={{ xs: 'center', md: 'flex-start' }}
          direction={{ xs: 'horizontal', md: 'vertical' }}
          justify={{ xs: 'space-between', md: 'flex-start' }}
          space="20px"
        >
          <Stack align="center" direction="horizontal">
            <NavLink active={router.asPath === '/'} href="/">
              <Button shape="circle" variant="tertiary">
                <Stack align="center" direction="horizontal">
                  <NextImage height={32} src="/logo.svg" width={32} />
                </Stack>
              </Button>
            </NavLink>

            <Box display={{ md: 'none' }}>
              <Button
                size="small"
                variant="tertiary"
                onClick={() => setState((x) => ({ ...x, open: !x.open }))}
              >
                <Box aria-label={state.open ? 'Close menu' : 'Open menu'}>
                  Menu
                </Box>
              </Button>
            </Box>
          </Stack>

          <ThemeSwitcher />
        </Stack>
      </Box>

      <Box
        className={styles.list}
        display={{ xs: state.open ? 'block' : 'none', md: 'block' }}
        height="full"
        paddingBottom={{ md: '192px' }}
        paddingTop={{ xs: '40px', md: '20px' }}
      >
        <Stack space="40px">
          <Stack space="12px">
            <NavLink href={createGitHubLink()}>GitHub</NavLink>
          </Stack>

          <Stack>
            <Text variant="label">Guides</Text>
            <Stack space="12px">
              <NavLink href="/guides/development">Development</NavLink>
            </Stack>
          </Stack>

          {links.map((x) => (
            <Stack key={x.name}>
              <Text variant="label">{x.name}</Text>

              <Stack space="12px">
                {x.links.map((y) => (
                  <NavLink
                    active={
                      isMounted && router.asPath.split('#')[0] === y.route
                    }
                    href={y.route}
                    key={y.route}
                  >
                    {y.name}
                  </NavLink>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

const NavLink = ({
  active,
  href,
  children,
}: React.PropsWithChildren<{
  active?: boolean
  href: string
}>) => {
  return (
    <Box width="max">
      <Link href={href}>
        <Text
          color={active ? 'accent' : 'text'}
          weight={active ? 'medium' : 'normal'}
        >
          {children}
        </Text>
      </Link>
    </Box>
  )
}
