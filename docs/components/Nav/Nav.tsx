import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import NextImage from 'next/image'

import { createPlayroomLink } from 'utils/playroom'
import { useIsMounted } from 'utils/isMounted'

import { Box, Button, Stack, Text } from '~/components'
import { Link } from '../Link'
import { ThemeSwitcher } from '../ThemeSwitcher'
import * as styles from './styles.css'

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
      <Box paddingBottom={{ md: '5' }}>
        <Stack
          align={{ xs: 'center', md: 'flex-start' }}
          direction={{ xs: 'horizontal', md: 'vertical' }}
          justify={{ xs: 'space-between', md: 'flex-start' }}
          space="5"
        >
          <Stack align="center" direction="horizontal">
            <NavLink active={router.asPath === '/'} href="/">
              <Button shape="circle" variant="secondary">
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
                <Box
                  aria-label={state.open ? 'Close menu' : 'Open menu'}
                  textTransform="capitalize"
                >
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
        paddingBottom={{ md: '48' }}
        paddingTop={{ xs: '10', md: '5' }}
      >
        <Stack space="10">
          <Stack space="3">
            <NavLink href="https://github.com/mirror-xyz/degen">GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </Stack>

          {links.map((x) => (
            <Stack key={x.name}>
              <Text variant="label">{x.name}</Text>

              <Stack space="3">
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
          transform="capitalize"
          weight={active ? 'medium' : 'normal'}
        >
          {children}
        </Text>
      </Link>
    </Box>
  )
}
