import * as React from 'react'

import { Box, Heading, Stack, Text } from 'degen/components'

type Props = {
  description?: React.ReactNode
  title: React.ReactNode
}

export const Header = ({ description, title }: Props) => {
  return (
    <Box as="header" marginBottom={description ? '64px' : '40px'}>
      <Stack space="40px">
        <Heading color="foreground" level="1">
          {title}
        </Heading>

        {description && (
          <Text color="textSecondary" size="extraLarge">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  )
}
