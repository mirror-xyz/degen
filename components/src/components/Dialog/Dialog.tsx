import * as React from 'react'
import { Portal } from '@reach/portal'
import { AutoFocusInside, default as FocusLock } from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'
import { animated, useTransition } from 'react-spring'

import { useId, useReduceMotion, useWindowEvent } from '../../hooks'
import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'
import { Heading } from '../Heading'
import { IconChevronLeft, IconClose } from '../icons'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'

type Action = Exclude<ButtonProps, 'variant'> & {
  autoFocus?: boolean
}

type Props = {
  open: boolean
  primaryAction?: Action
  secondaryAction?:
    | Action
    | (Action & {
        key: string
        variant: Exclude<ButtonProps['variant'], 'highlight'>
      })[]
  title: string
  titleVariant?: 'heading' | 'normal'
  description?: string
  width?: 'large' | 'small'
  onBack?(): void
  onClose(): void
}

export const Dialog = ({
  children,
  description,
  open = false,
  primaryAction,
  secondaryAction,
  title,
  titleVariant = 'normal',
  width = 'small',
  onBack,
  onClose,
}: React.PropsWithChildren<Props>) => {
  const contentRef = React.useRef<HTMLElement>(null)

  const id = useId()
  const titleId = `${id}-title`
  let descriptionId: string
  if (description) descriptionId = `${id}-description`

  const prefersReducedMotion = useReduceMotion()
  const transitions = useTransition(open, {
    from: { opacity: 0, y: 36 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 36 },
    config: {
      mass: 1,
      tension: 210,
      friction: 20,
    },
    immediate: prefersReducedMotion,
  })

  const hasActionAutoFocus =
    primaryAction?.autoFocus ||
    (Array.isArray(secondaryAction)
      ? secondaryAction.some((x) => x.autoFocus)
      : secondaryAction?.autoFocus)

  useWindowEvent('keydown', (event) => {
    if (!event.defaultPrevented) {
      if (event.code === 'Escape' || event.key === 'Escape') {
        onClose()
      }
    }
  })

  // Close dialog for interactions happening outside
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !open ||
        !contentRef.current ||
        contentRef.current.contains(event.target as Node)
      )
        return
      onClose()
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [contentRef, open, onClose])

  return transitions(
    ({ opacity, y }, item) =>
      item && (
        <Portal>
          <animated.div style={{ opacity }}>
            <Box className={styles.overlay} />

            <RemoveScroll>
              <Box
                display="flex"
                inset="0"
                overflow="auto"
                padding={{ sm: '12' }}
                paddingTop={{ xs: '20', sm: '12' }}
                position="fixed"
              >
                <animated.div
                  className={styles.wrapper({
                    variant: titleVariant === 'heading' ? 'large' : width,
                  })}
                  style={{ y }}
                >
                  <FocusLock disabled={!open} returnFocus>
                    <Box
                      aria-describedby={descriptionId}
                      aria-labelledby={titleId}
                      className={styles.content}
                      ref={contentRef}
                      role="dialog"
                    >
                      <Box
                        as="header"
                        display="flex"
                        flexDirection="column"
                        minHeight="16"
                        paddingTop={titleVariant === 'heading' ? '16' : '5'}
                      >
                        <Box id={titleId} textAlign="center">
                          {titleVariant === 'normal' ? (
                            <Text color="text" weight="semiBold">
                              {title}
                            </Text>
                          ) : (
                            <Heading level="1" responsive>
                              {title}
                            </Heading>
                          )}
                        </Box>

                        {description && (
                          <Box id={descriptionId} textAlign="center">
                            <Text color="textSecondary" variant="large">
                              {description}
                            </Text>
                          </Box>
                        )}

                        {onBack && (
                          <Box left="2.5" position="absolute" top="2.5">
                            <Button
                              shape="circle"
                              size="small"
                              variant="transparent"
                              onClick={onBack}
                            >
                              <VisuallyHidden>Back</VisuallyHidden>
                              <IconChevronLeft size="6" />
                            </Button>
                          </Box>
                        )}

                        <Box position="absolute" right="2.5" top="2.5">
                          {maybeFocus(
                            <Button
                              shape="circle"
                              size="small"
                              variant="transparent"
                              onClick={onClose}
                            >
                              <VisuallyHidden>Close Dialog</VisuallyHidden>
                              <IconClose size="6" />
                            </Button>,
                            !hasActionAutoFocus,
                          )}
                        </Box>
                      </Box>

                      <Box paddingBottom="10" paddingTop="8" paddingX="10">
                        <Stack space="6">
                          {children}

                          {(primaryAction || secondaryAction) && (
                            <Box
                              display="flex"
                              flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
                              gap="6"
                              justifyContent="flex-end"
                            >
                              {secondaryAction && (
                                <>
                                  {Array.isArray(secondaryAction)
                                    ? secondaryAction.map(({ key, ...x }) =>
                                        maybeFocus(
                                          <Button
                                            data-autofocus={x.autoFocus}
                                            key={key}
                                            width={{ xs: 'full', sm: 'auto' }}
                                            {...x}
                                          />,
                                          x.autoFocus,
                                        ),
                                      )
                                    : maybeFocus(
                                        <Button
                                          data-autofocus={
                                            secondaryAction.autoFocus
                                          }
                                          variant="secondary"
                                          width={{ xs: 'full', sm: 'auto' }}
                                          {...secondaryAction}
                                        />,
                                        secondaryAction.autoFocus,
                                      )}
                                </>
                              )}

                              {primaryAction &&
                                maybeFocus(
                                  <Button
                                    variant="highlight"
                                    width={{ xs: 'full', sm: 'auto' }}
                                    {...primaryAction}
                                  />,
                                  primaryAction.autoFocus,
                                )}
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </Box>
                  </FocusLock>
                </animated.div>
              </Box>
            </RemoveScroll>
          </animated.div>
        </Portal>
      ),
  )
}

const maybeFocus = (element: React.ReactNode, focus?: boolean) =>
  focus ? <AutoFocusInside>{element}</AutoFocusInside> : element
