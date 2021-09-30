import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

import { createPlayroomLink } from 'src/utils/playroom'

import { Box, Stack, Text } from '~/components'
import { Link } from './Link'

type Link = { name: string; route: string }

export type Props = {
  links: { name: string; links: Link[] }[]
}

export const Nav = ({ links }: Props) => {
  const router = useRouter()
  return (
    <Box as="nav" paddingX="8" paddingY="8">
      <Stack direction="vertical" space="10">
        <Stack direction="vertical" space="2">
          <NavLink active={router.asPath === '/'} href="/">
            Home
          </NavLink>
          <NavLink href="https://github.com/mirror-xyz">GitHub</NavLink>
          <NavLink href={createPlayroomLink()}>Playroom</NavLink>
        </Stack>

        {links.map((x) => (
          <Stack direction="vertical" key={x.name}>
            <Text variant="label">{x.name}</Text>

            <Stack direction="vertical" space="2">
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
    <Link href={href}>
      <Text
        color={active ? 'accent' : 'text'}
        weight={active ? 'medium' : 'normal'}
      >
        {children}
      </Text>
    </Link>
  )
}
