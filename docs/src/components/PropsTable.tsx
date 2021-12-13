import * as React from 'react'
import { PropItem } from 'react-docgen-typescript'

import { Box, Button, Stack, Text, VisuallyHidden } from 'degen/components'

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
  const [state, setState] = React.useState<{
    showDescriptions: boolean
  }>({
    showDescriptions: Object.values(types).some((x) => x.description !== ''),
  })

  const headers = [
    'name',
    'type',
    'default',
    ...(state.showDescriptions ? ['description'] : []),
  ]
  const props = Object.values(types).sort((a, b) => {
    if (a.name.startsWith('on') || b.name.startsWith('on')) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return (
    <>
      {props.length ? (
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
                      borderLeftRadius={i === 0 ? 'large' : undefined}
                      borderRightRadius={
                        i === headers.length - 1 ? 'large' : undefined
                      }
                      paddingX="4"
                      paddingY="2.5"
                    >
                      <Text variant="label">{x}</Text>
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
                      {x.defaultValue?.value.toString() ?? '-'}
                    </Text>
                  </Box>

                  {state.showDescriptions && (
                    <Box {...dataProps}>
                      <Text color="textSecondary" size="small">
                        {x.description || '-'}
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Text color="textSecondary">No props</Text>
        </Box>
      )}

      <Box marginY="2">
        <Stack direction="horizontal" justify="flex-end" space="2">
          {!!props.length && (
            <Button
              size="small"
              variant="transparent"
              onClick={() =>
                setState((x) => ({
                  ...x,
                  showDescriptions: !x.showDescriptions,
                }))
              }
            >
              {state.showDescriptions ? 'Hide Description' : 'Show Description'}
            </Button>
          )}

          {sourceLink && (
            <Link href={sourceLink}>
              <Button size="small" variant="transparent">
                View Source on GitHub
              </Button>
            </Link>
          )}
        </Stack>
      </Box>
    </>
  )
}
