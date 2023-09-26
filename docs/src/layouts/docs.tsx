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

      <Box
        marginX="auto"
        maxWidth="1280px"
        minHeight="viewHeight"
        paddingX="24px"
      >
        <Box
          as="aside"
          height={{ md: 'viewHeight' }}
          paddingRight={{ md: '48px' }}
          paddingTop="48px"
          position={{ md: 'fixed' }}
          width={{ md: '256px' }}
        >
          <Nav links={links} />
        </Box>

        <Box as="main" marginLeft={{ md: '256px' }}>
          <SkipNavContent />
          <Box
            as="article"
            maxWidth="896px"
            paddingBottom="80px"
            paddingTop="80px"
            paddingX={{ lg: '40px' }}
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
