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

import { Box, Text } from 'degen/components'

import { Props as LayoutProps, getLayout } from '~/layouts/docs'
import { getGuideName, getGuidePaths } from '~/utils/fs'
import { createGitHubLink } from '~/utils/github'
import { Link } from '~/components'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getGuidePaths().map((x) => ({
    params: {
      slug: getGuideName(x),
    },
  })),
  fallback: false,
})

type StaticProps = {
  docsLink: string
  frontMatter: Record<string, any>
  source: MDXRemoteSerializeResult
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const slug = context.params?.slug?.toString() as string
  const pathname = getGuidePaths().find(
    (x) => getGuideName(x) === slug,
  ) as string
  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
  })

  const docsLink = createGitHubLink(pathname.replace(/^\/.*degen/i, ''))

  return {
    props: {
      docsLink,
      frontMatter: data,
      source: mdxSource,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({ docsLink, source }: Props) => {
  return (
    <>
      <MDXRemote {...source} scope={source.scope} />

      <Box marginTop="20">
        <Link href={docsLink}>
          <Text color="textTertiary" size="small">
            Edit on GitHub
          </Text>
        </Link>
      </Box>
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
