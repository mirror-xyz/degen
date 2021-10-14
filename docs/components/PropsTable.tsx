import { PropItem } from 'react-docgen-typescript'

import { Box, Button, Stack, Text, VisuallyHidden } from '~/components'
import { Link } from './Link'

type Props = {
  sourceLink?: string
  types: Record<string, PropItem>
}

const dataProps: Parameters<typeof Box>[0] = {
  as: 'td',
  paddingX: '4',
  paddingY: '3',
}

export const PropsTable = ({ sourceLink, types }: Props) => {
  const headers = ['name', 'type', 'description', 'default']
  const props = Object.values(types).sort((a, b) => (a.name > b.name ? 1 : -1))
  return (
    <>
      <Box maxWidth="full" overflow={{ xs: 'scroll', lg: 'unset' }}>
        <Box as="table" width="full">
          <Box as="thead">
            <Box as="tr" textAlign="left">
              {headers.map((x, i) => (
                <Box
                  as="th"
                  backgroundColor="background"
                  key={x}
                  position="sticky"
                  top="0"
                >
                  <Box
                    backgroundColor="foregroundTertiary"
                    borderColor="foregroundSecondary"
                    paddingX="4"
                    paddingY="2.5"
                    radiusLeft={i === 0 ? '2' : undefined}
                    radiusRight={i === headers.length - 1 ? '2' : undefined}
                  >
                    <Text
                      color="text"
                      size="label"
                      transform="uppercase"
                      weight="normal"
                    >
                      {x}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box as="tbody">
            {props.map((x) => (
              <Box as="tr" borderBottomWidth="px" key={x.name}>
                <Box {...dataProps}>
                  <Text color="text" size="small">
                    {x.name}
                    {x.required && (
                      <Text as="span" color="red" size="small">
                        *<VisuallyHidden>Required</VisuallyHidden>
                      </Text>
                    )}
                  </Text>
                </Box>

                <Box {...dataProps}>
                  <Text color="accent" font="mono" size="small">
                    {x.type.raw ?? x.type.name}
                  </Text>
                </Box>

                <Box {...dataProps}>
                  <Text color="textSecondary" size="small">
                    {x.description || '-'}
                  </Text>
                </Box>

                <Box {...dataProps}>
                  <Text color="textSecondary" size="small">
                    {x.defaultValue?.value ?? '-'}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {sourceLink && (
        <Box marginY="2">
          <Stack direction="horizontal" justify="flex-end" space="2">
            <Link href={sourceLink}>
              <Button size="small" variant="transparentSecondary">
                View Source on GitHub
              </Button>
            </Link>
          </Stack>
        </Box>
      )}
    </>
  )
}
