import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import GithubSlugger from 'github-slugger'

import { CodeBlock } from './CodeBlock'
import { ThemePropsContext } from '../context'
import { Demo } from './Demo'
import { TsInfo } from './TsInfo'
import { AnchorLink } from './AnchorLink'

const components = {
  pre: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
  ) => <div {...props} />,
  code: CodeBlock,
  Demo,
  TsInfo,
}

type Props = {
  children: React.ReactNode
}

export const Mdx = ({ children }: Props) => {
  const themeProps = React.useContext(ThemePropsContext)

  const mdxComponents = React.useMemo(() => {
    // reset slugger state for each page
    const slugger = new GithubSlugger()
    return {
      ...components,
      h2: heading(2),
      h3: heading(3),
      h4: heading(4),
      h5: heading(5),
    }
    function heading(level: number) {
      const Tag = 'h' + level
      return function Heading(
        props: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLHeadingElement>,
          HTMLDivElement
        >,
      ) {
        const [idCache] = React.useState<Record<string, string>>({})
        const title = props.children
        if (typeof title === 'string') {
          if (!idCache[title]) idCache[title] = slugger.slug(title)
          const id = idCache[title]
          return (
            <Tag {...props}>
              <AnchorLink className="anchor" id={id} to={`#${id}`}>
                link
              </AnchorLink>
              {title}
            </Tag>
          )
        }
        return <Tag {...props} />
      }
    }
  }, [themeProps.loadState.routePath])

  return (
    <MDXProvider components={mdxComponents}>
      <div className="markdown-body">{children}</div>
    </MDXProvider>
  )
}
