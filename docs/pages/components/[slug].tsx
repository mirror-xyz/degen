import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import fs from 'fs-extra'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import Head from 'next/head'

import { getComponentName, getComponentPaths } from 'utils'
import { CodeBlock } from 'components'

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
}

const Page = ({ frontMatter, source }: Props) => {
  return (
    <div>
      <div className="post-header">
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="description">{frontMatter.description}</p>
        )}
      </div>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </div>
  )
}

export default Page
