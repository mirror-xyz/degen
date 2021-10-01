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
    <Box marginBottom="6" marginTop="8">
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
        display="block"
        href={`#${id}`}
        marginBottom="6"
        marginTop="8"
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
      borderRadius="1.5"
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
      <Text as="p" color="text" lineHeight="1.625" variant="base">
        {children}
      </Text>
    </Box>
  ),
  pre: (props) => <Box marginY="6" {...props} />,
}
