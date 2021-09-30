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

import { MDX } from 'components'
import { getLayout } from 'layouts/docs'
import { getComponentName, getComponentPaths, getStaticTypes } from 'utils/fs'

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
  const pathname = getComponentPaths().find(
    (x) => getComponentName(x) === slug,
  ) as string
  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  const componentPathname = pathname.replace('docs.mdx', 'tsx')
  const staticTypes = getStaticTypes(componentPathname)

  return {
    props: {
      frontMatter: data,
      source: mdxSource,
      staticTypes,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({ source, staticTypes }: Props) => {
  console.log(staticTypes)
  return <MDXRemote {...source} components={MDX} />
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
