import { MDXProviderProps } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'

import { Box, Heading, IconLink, Stack, Text } from '~/components'

import { CodeBlock } from '../CodeBlock'
import { Link } from '../Link'
import * as styles from './styles.css'

export const MDX: MDXProviderProps['components'] = {
  a: (props) => <Link className={styles.link} {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h1: ({ children }) => (
    <Box marginBottom="6" marginTop="9">
      <Heading color="textPrimary" level="1">
        {children}
      </Heading>
    </Box>
  ),
  h2: ({ children }) => {
    const id = slugify(children)
    return (
      <Box
        as="a"
        className={styles.anchorParent}
        href={`#${id}`}
        marginBottom="6"
        marginTop="9"
      >
        <Stack align="center" space="3">
          <Heading color="textPrimary" id={id}>
            {children}
          </Heading>
          <Box className={styles.anchor}>
            <IconLink tone="textSecondary" />
          </Box>
        </Stack>
      </Box>
    )
  },
  inlineCode: ({ children }) => (
    <Box
      as="code"
      backgroundColor="backgroundSecondary"
      borderRadius="md"
      paddingX="1.5"
      paddingY="0.5"
    >
      <Text as="span" font="mono">
        {children}
      </Text>
    </Box>
  ),
  p: ({ children }) => (
    <Box marginY="6">
      <Text as="p" color="text" lineHeight="relaxed" variant="base">
        {children}
      </Text>
    </Box>
  ),
  pre: (props) => <Box marginY="6" {...props} />,
}
