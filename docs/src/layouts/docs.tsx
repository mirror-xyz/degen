import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import { Box } from 'degen/components'

import {
  Header,
  Nav,
  NavProps,
  SkipNavContent,
  SkipNavLink,
} from '~/components'
import { getLayout as getBaseLayout } from './site'

export type Props = {
  meta: {
    title: string
    description?: string
  }
}

const Layout: NextLayout<Props> = ({ children, meta }) => {
  const links = (process.env.navLinks as unknown as NavProps['links']) ?? []
  return (
    <>
      <Head>
        <title>
          {meta?.title ? `${meta.title} — Mirror Design` : 'Mirror Design'}
        </title>
        <meta
          content={
            meta?.description ??
            'Design system for Mirror.xyz built with React and vanilla-extract.'
          }
          key="description"
          name="description"
        />
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
            {meta && <Header {...meta} />}

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
