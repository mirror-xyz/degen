import { MDXProviderProps } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'

import { Box, Heading, Text } from 'degen/components'

import * as styles from '~/styles/utils.css'
import { CodeBlock } from './CodeBlock'
import { Link } from './Link'
import { SearchIcons } from './SearchIcons'
import { PropsTable } from './PropsTable'

export const MDX: MDXProviderProps['components'] = {
  PropsTable,
  SearchIcons,
  // Default components
  // https://mdxjs.com/table-of-components/
  a: (props) => <Link className={styles.link} {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h2: ({ children }) => {
    const id = slugify(children)
    return (
      <Box display="block" marginBottom="6" marginTop="12">
        <Heading color="textPrimary" id={id}>
          <Box
            as="a"
            className={styles.hoverParent}
            href={`#${id}`}
            width="max"
          >
            {children}
            <Box
              className={styles.hoverChild}
              color="textSecondary"
              display="inline-block"
              marginLeft="2"
            >
              #
            </Box>
          </Box>
        </Heading>
      </Box>
    )
  },
  inlineCode: ({ children }) => (
    <Text as="code" color="accent" font="mono">
      {children}
    </Text>
  ),
  p: ({ children }) => (
    <Box marginY="6">
      <Text as="p" color="text" lineHeight="1.625" variant="base">
        {children}
      </Text>
    </Box>
  ),
  pre: (props) => <Box marginY="6" {...props} />,
}
