import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'

import { Button } from '../Button'
import { Heading } from '../Heading'
import { IconClose } from '../icons'
import { Text } from '../Text'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'

type Props = {
  description?: string
  open: boolean
  title: string
  titleVariant?: 'small' | 'large'
  trigger: React.ReactNode
  onClose(): void
  onOpenChange(open: boolean): void
}

export const Dialog = ({
  description,
  open,
  title,
  titleVariant = 'small',
  trigger,
  onClose,
  onOpenChange,
}: Props) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>

      <RadixDialog.Overlay />

      <RadixDialog.Content
        className={styles.content}
        onEscapeKeyDown={onClose}
        onInteractOutside={onClose}
        onPointerDownOutside={onClose}
      >
        <RadixDialog.Title asChild>
          {titleVariant === 'small' ? (
            <Text>{title}</Text>
          ) : (
            <Heading level="1">{title}</Heading>
          )}
        </RadixDialog.Title>

        {description && (
          <RadixDialog.Description asChild>
            {description}
          </RadixDialog.Description>
        )}

        <RadixDialog.Close asChild>
          <Button shape="circle" size="small" variant="transparent">
            <VisuallyHidden>Close Dialog</VisuallyHidden>
            <IconClose size="6" />
          </Button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Root>
  )
}
