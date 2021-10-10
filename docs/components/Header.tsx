import * as React from 'react'

import { Box, Heading, Stack, Text } from '~/components'

type Props = {
  description?: React.ReactElement
  title: React.ReactElement
}

export const Header = ({ description, title }: Props) => {
  return (
    <Box as="header" marginBottom={description ? '16' : '10'}>
      <Stack space="10">
        <Heading color="foreground" level="1">
          {title}
        </Heading>

        {description && (
          <Text color="text" lineHeight="1.375" size="extraLarge">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  )
}
