import { MDXProviderProps } from '@mdx-js/react'

import { Box, Text } from '~/components'

import { CodeBlock } from '../CodeBlock'
import { Link } from '../Link'
import * as styles from './styles.css'

export const MDX: MDXProviderProps['components'] = {
  a: (props) => <Link className={styles.link} {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h1: ({ children }) => (
    <Box marginBottom="6" marginTop="9">
      <Text color="textPrimary" variant="headingOne">
        {children}
      </Text>
    </Box>
  ),
  h2: ({ children }) => (
    <Box marginBottom="6" marginTop="9">
      <Text color="textPrimary" variant="headingTwo">
        {children}
      </Text>
    </Box>
  ),
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
    <Box as="p" marginY="6">
      <Text as="span" color="text" variant="base">
        {children}
      </Text>
    </Box>
  ),
  pre: (props) => <Box marginY="6" {...props} />,
}
