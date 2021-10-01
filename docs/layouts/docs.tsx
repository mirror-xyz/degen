import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import { Nav, NavProps, SkipNavContent, SkipNavLink } from 'components'

import { Box, Heading, Stack, Text } from '~/components'
import { getLayout as getBaseLayout } from './site'

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

      <SkipNavLink>Skip to content</SkipNavLink>

      <Box marginX="auto" maxWidth="320" minHeight="viewHeight" paddingX="6">
        <Box
          as="aside"
          height={{ md: 'viewHeight' }}
          paddingRight={{ md: '12' }}
          paddingTop="12"
          position={{ md: 'fixed' }}
          width={{ md: '64' }}
        >
          <Nav links={links} />
        </Box>

        <Box as="main" marginLeft={{ md: '64' }}>
          <SkipNavContent />
          <Box
            as="article"
            maxWidth="224"
            paddingBottom="20"
            paddingTop="20"
            paddingX={{ lg: '10' }}
          >
            <Box as="header" marginBottom={meta.description ? '16' : '10'}>
              <Stack direction="vertical" space="10">
                <Heading color="foreground" level="1">
                  {meta.title}
                </Heading>

                {meta.description && (
                  <Text color="text" lineHeight="1.375" size="extraLarge">
                    {meta.description}
                  </Text>
                )}
              </Stack>
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
