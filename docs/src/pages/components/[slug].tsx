import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import fs from 'fs-extra'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import { PropItem } from 'react-docgen-typescript'

import { Box, Text } from 'degen/components'

import { Props as LayoutProps, getLayout } from '~/layouts/docs'
import { getComponentName, getComponentPaths } from '~/utils/fs'
import { getStaticTypes } from '~/utils/getStaticTypes'
import { createGitHubLink } from '~/utils/github'
import { Link } from '~/components'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getComponentPaths().map((x) => ({
    params: {
      slug: getComponentName(x),
    },
  })),
  fallback: false,
})

type StaticProps = {
  docsLink: string
  frontMatter: Record<string, any>
  source: MDXRemoteSerializeResult
  sourceLink: string
  staticTypes?: Record<string, PropItem>
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const slug = context.params?.slug?.toString() as string
  const pathname = getComponentPaths().find(
    (x) => getComponentName(x) === slug,
  ) as string
  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
  })

  const componentPathname = pathname.replace('docs.mdx', 'tsx')
  const staticTypes = getStaticTypes(componentPathname)[slug] ?? null

  const docsLink = createGitHubLink(pathname.replace(/^\/.*degen/i, ''))
  const sourceLink = createGitHubLink(
    componentPathname.replace(/^\/.*degen/i, ''),
  )

  return {
    props: {
      docsLink,
      frontMatter: data,
      source: mdxSource,
      sourceLink,
      staticTypes,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({
  docsLink,
  source,
  sourceLink,
  staticTypes,
}: Props) => {
  return (
    <>
      <MDXRemote
        {...source}
        scope={{
          ...source.scope,
          sourceLink,
          types: staticTypes,
        }}
      />

      {!docsLink.includes('generated') && (
        <Box marginTop="80px">
          <Link href={docsLink}>
            <Text color="textSecondary" size="small">
              Edit on GitHub
            </Text>
          </Link>
        </Box>
      )}
    </>
  )
}

Page.getLayout = (page) =>
  getLayout({
    ...page,
    props: {
      ...page.props,
      meta: page.props.frontMatter as LayoutProps['meta'],
    },
  })

export default Page
