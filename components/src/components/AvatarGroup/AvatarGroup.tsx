import * as React from 'react'

import { Avatar, Props as AvatarProps } from '../Avatar'
import { Box } from '../Box'
import { Tag } from '../Tag'
import * as styles from './styles.css'
import { EnsAvatarHook } from '../Avatar/Avatar'

type Props = {
  as?: 'img' | React.ComponentType
  limit?: number
  hover?: boolean
  members: {
    label: AvatarProps['label']
    placeholder?: AvatarProps['placeholder']
    src?: AvatarProps['src']
    address?: AvatarProps['address']
  }[]
  size?: '20px' | '24px'
  tag?: string | JSX.Element
  tagTone?: React.ComponentProps<typeof Tag>['tone']
  ensAvatarHook?: EnsAvatarHook
}

export const AvatarGroup = ({
  as,
  limit = 3,
  members = [],
  hover,
  size = '24px',
  tag,
  tagTone,
  ensAvatarHook,
}: Props) => {
  const membersCount = members.length
  const visibleMembers = members.slice(0, limit)
  const variantSize = size === '20px' ? 'small' : 'large'
  const showTag = membersCount > limit || !!tag
  const tagValue = tag || `+${(membersCount - limit).toLocaleString()}`
  return (
    <Box alignItems="center" display="flex">
      <Box display="flex">
        {visibleMembers.map((x, i) => (
          <Box
            backgroundColor="background"
            borderRadius="full"
            className={styles.wrapper}
            key={x.label}
            marginLeft={
              i === 0 ? '0px' : variantSize === 'small' ? '-4px' : '-6px'
            }
          >
            <Avatar
              address={x.address}
              as={as}
              ensAvatarHook={ensAvatarHook}
              label={x.label}
              placeholder={x.placeholder}
              size={size}
              src={x.src}
            />
          </Box>
        ))}
      </Box>
      {showTag && (
        <Box
          backgroundColor="background"
          borderRadius="full"
          className={styles.wrapper}
          marginLeft={variantSize === 'small' ? '-4px' : '-6px'}
        >
          {typeof tagValue === 'string' ? (
            <Tag
              hover={hover}
              size={variantSize === 'small' ? 'small' : 'medium'}
              tone={tagTone}
            >
              {tagValue}
            </Tag>
          ) : (
            tagValue
          )}
        </Box>
      )}
    </Box>
  )
}
