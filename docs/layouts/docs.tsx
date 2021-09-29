import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import { getLayout as getBaseLayout } from './site'
import { Box, Text } from '~/components'

type Props = {
  meta: {
    title: string
    description?: string
  }
}

const Layout: NextLayout<Props> = ({ children, meta }) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {meta.description && (
          <meta
            content={meta.description}
            key="description"
            name="description"
          />
        )}
      </Head>

      <Box
        as="article"
        marginX="auto"
        maxWidth="224"
        paddingBottom="10"
        paddingTop="14"
        paddingX="8"
      >
        <Box as="header" marginBottom="10">
          <Text variant="headingOne">{meta.title}</Text>
        </Box>

        {children}
      </Box>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
