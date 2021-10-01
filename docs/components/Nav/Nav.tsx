import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import NextImage from 'next/image'

import { createPlayroomLink } from 'utils/playroom'

import { Box, Button, Stack, Text } from '~/components'
import { Link } from '../Link'
import { ThemeSwitcher } from '../ThemeSwitcher'
import * as styles from './styles.css'

type Link = { name: string; route: string }

export type Props = {
  links: { name: string; links: Link[] }[]
}

export const Nav = ({ links }: Props) => {
  const router = useRouter()
  return (
    <Box flexDirection="column" height="full">
      <Box paddingBottom={{ md: '5' }}>
        <Stack
          align={{ xs: 'center', md: 'flex-start' }}
          direction={{ xs: 'horizontal', md: 'vertical' }}
          justify={{ xs: 'space-between', md: 'flex-start' }}
          space="5"
        >
          <NavLink active={router.asPath === '/'} href="/">
            <Button shape="circle" variant="secondary">
              <Stack align="center">
                <NextImage height={32} src="/logo.svg" width={32} />
              </Stack>
            </Button>
          </NavLink>

          <ThemeSwitcher />
        </Stack>
      </Box>

      <Box
        className={styles.list}
        display={{ xs: 'none', md: 'block' }}
        height="full"
        paddingBottom="36"
        paddingTop="5"
      >
        <Stack direction="vertical" space="10">
          <Stack direction="vertical" space="3">
            <NavLink href="https://github.com/mirror-xyz">GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </Stack>

          {links.map((x) => (
            <Stack direction="vertical" key={x.name}>
              <Text variant="label">{x.name}</Text>

              <Stack direction="vertical" space="3">
                {x.links.map((y) => (
                  <NavLink
                    active={router.asPath === y.route}
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
