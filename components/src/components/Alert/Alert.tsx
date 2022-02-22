import * as React from 'react'

import { Box } from '../Box'
import { Button } from '../Button'
import { IconClose } from '../icons'
import { Stack } from '../Stack'
import { VisuallyHidden } from '../VisuallyHidden'

type Props = {
  title?: string
  onClose?(event: React.MouseEvent): void
}

export const Alert = ({
  children,
  title,
  onClose,
}: React.PropsWithChildren<Props>) => {
  return (
    <Box
      aria-live="polite"
      display="flex"
      justifyContent="space-between"
      role="alert"
      width="full"
    >
      <Stack space="2">
        {title && <Box fontWeight="semiBold">{title}</Box>}
        <Box fontSize="small" lineHeight="1.625">
          {children}
        </Box>
      </Stack>

      {onClose && (
        <Button
          shape="circle"
          size="small"
          variant="transparent"
          onClick={onClose}
        >
          <VisuallyHidden>Close Alert</VisuallyHidden>
          <IconClose />
        </Button>
      )}
    </Box>
  )
}
