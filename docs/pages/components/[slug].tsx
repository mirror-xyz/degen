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

import { MDX } from 'components'
import { Props as LayoutProps, getLayout } from 'layouts/docs'
import { getComponentName, getComponentPaths } from 'utils/getComponent'
import { getStaticTypes } from 'utils/getStaticTypes'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getComponentPaths().map((x) => ({
    params: {
      slug: getComponentName(x),
    },
  })),
  fallback: false,
})

type StaticProps = {
  frontMatter: Record<string, any>
  source: MDXRemoteSerializeResult
  staticTypes: Record<string, any>
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const slug = context.params?.slug
  const pathname = getComponentPaths().find(
    (x) => getComponentName(x) === slug,
  ) as string
  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
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

const Page: NextPageWithLayout<Props> = ({ source }: Props) => {
  return <MDXRemote {...source} components={MDX as any} />
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
