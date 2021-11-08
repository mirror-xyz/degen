import * as React from 'react'

import { Avatar } from '../Avatar'
import { Box, BoxProps } from '../Box'
import { Text } from '../Text'
import * as styles from './styles.css'

type Props = {
  as?: 'img' | React.ComponentType
  limit?: number
  members: { label: string; placeholder?: boolean; src?: string }[]
  size?: BoxProps['height']
}

export const AvatarGroup = ({
  as,
  limit = 3,
  members = [],
  size = '6',
}: Props) => {
  const membersCount = members.length
  const visibleMembers = members.slice(0, limit)
  return (
    <Box alignItems="center" display="flex" gap="1.5">
      <Box display="flex" paddingLeft="1.5">
        {visibleMembers.map((x) => (
          <Box
            borderRadius="full"
            className={styles.wrapper}
            key={x.label}
            marginLeft="-1.5"
          >
            <Avatar
              as={as}
              label={x.label}
              placeholder={x.placeholder}
              size={size}
              src={x.src}
            />
          </Box>
        ))}
      </Box>
      {membersCount > limit && (
        <Text color="textTertiary" size="base" weight="bold">
          +{(membersCount - limit).toLocaleString()}
        </Text>
      )}
    </Box>
  )
}
