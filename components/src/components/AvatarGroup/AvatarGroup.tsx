import * as React from 'react'

import { Avatar, Props as AvatarProps } from '../Avatar'
import { Box, BoxProps } from '../Box'
import { useTheme } from '../ThemeProvider'
import * as styles from './styles.css'

type Props = {
  as?: 'img' | React.ComponentType
  limit?: number
  members: {
    label: AvatarProps['label']
    placeholder?: AvatarProps['placeholder']
    src?: AvatarProps['src']
  }[]
  size?: BoxProps['height']
}

export const AvatarGroup = ({
  as,
  limit = 3,
  members = [],
  size = '6',
}: Props) => {
  const { mode, forcedMode } = useTheme()
  const membersCount = members.length
  const visibleMembers = members.slice(0, limit)
  const variantSize = size < 5 ? 'small' : 'large'
  return (
    <Box alignItems="center" display="flex">
      <Box display="flex">
        {visibleMembers.map((x, i) => (
          <Box
            backgroundColor="background"
            borderRadius="full"
            className={styles.wrapper}
            key={x.label}
            marginLeft={i === 0 ? '0' : variantSize === 'small' ? '-1' : '-1.5'}
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
        <Box
          className={styles.overflowText({
            size: variantSize,
            theme: forcedMode ?? mode ?? 'light',
          })}
          color="textTertiary"
          fontWeight="semiBold"
        >
          +{(membersCount - limit).toLocaleString()}
        </Box>
      )}
    </Box>
  )
}
