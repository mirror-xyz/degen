import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import { getLayout as getBaseLayout } from './site'
import { Box } from '~/components'

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

      <Box as="article">
        <Box as="header">
          <h1>{meta.title}</h1>
        </Box>

        {children}
      </Box>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
