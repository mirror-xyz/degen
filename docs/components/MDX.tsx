import { MDXProviderProps } from '@mdx-js/react'

import { CodeBlock } from 'components'

import { Box, Text } from '~/components'

export const MDX: MDXProviderProps['components'] = {
  code: (props) => <CodeBlock {...props} />,
  h1: ({ children }) => (
    <Box marginBottom="6" marginTop="9">
      <Text variant="headingOne">{children}</Text>
    </Box>
  ),
  h2: ({ children }) => (
    <Box marginBottom="6" marginTop="9">
      <Text variant="headingTwo">{children}</Text>
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
      <Text as="span" variant="base">
        {children}
      </Text>
    </Box>
  ),
  pre: (props) => <Box marginY="6" {...props} />,
}
