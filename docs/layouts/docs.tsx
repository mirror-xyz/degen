import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { Nav, NavProps } from 'components'

import { getLayout as getBaseLayout } from './site'
import { Box, Text } from '~/components'
import { EmptyObject } from '~/types'

const ThemeSwitcher = dynamic<EmptyObject>(
  () => import('../components/ThemeSwitcher').then((x) => x.ThemeSwitcher),
  {
    ssr: false,
  },
)

type Props = {
  meta: {
    title: string
    description?: string
  }
}

const Layout: NextLayout<Props> = ({ children, meta }) => {
  const links = (process.env.navLinks as unknown as NavProps['links']) ?? []
  const title = meta.title ? `${meta.title} — Mirror Design` : 'Mirror Design'
  return (
    <>
      <Head>
        <title>{title}</title>

        {meta.description && (
          <meta
            content={meta.description}
            key="description"
            name="description"
          />
        )}
      </Head>

      <Box>
        <Box
          display={{ xs: 'none', xl: 'block' }}
          inset="0"
          position="fixed"
          width="56"
        >
          <Nav links={links} />

          <Box bottom="5" left="5" position="absolute">
            <ThemeSwitcher />
          </Box>
        </Box>

        <Box as="main">
          <Box
            as="article"
            marginX="auto"
            maxWidth="224"
            paddingBottom="10"
            paddingTop="14"
            paddingX="8"
          >
            <Box as="header" marginBottom="10">
              <Text color="textPrimary" variant="headingOne">
                {meta.title}
              </Text>
            </Box>

            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
