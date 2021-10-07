import { MDXProviderProps } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'
import NextLink from 'next/link'

import { Box, Heading, Text } from '~/components'

import { CodeBlock } from '../CodeBlock'
import { Link } from '../Link'
import * as styles from './styles.css'

export const MDX: MDXProviderProps['components'] = {
  a: (props) => <Link className={styles.link} {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h2: ({ children }) => {
    const id = slugify(children)
    return (
      <Box
        className={styles.anchorParent}
        display="block"
        marginBottom="6"
        marginTop="12"
      >
        <Heading color="textPrimary" id={id}>
          <NextLink href={`#${id}`} passHref>
            <Box as="a" width="max">
              {children}
              <Box
                className={styles.anchor}
                color="textSecondary"
                display="inline-block"
                marginLeft="2"
              >
                #
              </Box>
            </Box>
          </NextLink>
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
