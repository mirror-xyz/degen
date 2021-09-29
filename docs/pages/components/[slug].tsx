import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import fs from 'fs-extra'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import Head from 'next/head'

import { CodeBlock } from 'components'
import { getLayout } from 'layouts/docs'
import { getComponentName, getComponentPaths } from 'utils'

import { Box } from '~/components'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getComponentPaths().map((x) => ({
    params: {
      slug: getComponentName(x),
    },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const pathname = getComponentPaths().find((x) => getComponentName(x) === slug)
  const source = fs.readFileSync(pathname as string)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const components = {
  Head,
  code: CodeBlock,
  pre: Box,
}

const Page: NextPageWithLayout<Props> = ({ source }: Props) => {
  return <MDXRemote {...source} components={components} />
}

Page.getLayout = (page) =>
  getLayout({
    ...page,
    props: {
      ...page.props,
      meta: page.props.frontMatter,
    },
  })

export default Page
