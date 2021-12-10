import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { Button } from '../Button'
import { FileInput, FileInputProps } from '../FileInput'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { VisuallyHidden } from '../VisuallyHidden'
import { IconClose, IconExclamation, IconUpload } from '../icons'
import * as styles from './styles.css'

type Image =
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/jpeg, image/png, image/webp'
type Video =
  | 'image/gif'
  | 'video/mp4'
  | 'video/ogg'
  | 'video/webm'
  | 'image/gif, video/mp4, video/ogg, video/webm'
export type Accept = Image | Video | `${Image}, ${Video}`

type BaseProps = {
  accept?: Accept
  autoFocus?: FileInputProps['autoFocus']
  defaultValue?: { name?: string; type: string; url: string }
  disabled?: FileInputProps['disabled']
  error?: boolean | React.ReactNode
  id?: FileInputProps['id']
  label: React.ReactNode
  /** Size in megabytes */
  maxSize?: number
  name?: string
  required?: FileInputProps['required']
  tabIndex?: FileInputProps['tabIndex']
  uploaded?: boolean
  uploading?: boolean
  uploadProgress?: number
  onBlur?: FileInputProps['onBlur']
  onError?(error: string): void
  onChange?: FileInputProps['onChange']
  onFocus?: FileInputProps['onFocus']
  onReset?: FileInputProps['onReset']
}

type WithoutCompact = {
  compact?: never
  cover?: boolean
}

type WithCompact = {
  /** Show smaller input */
  compact?: boolean
  cover?: never
}

type Props = BaseProps & (WithCompact | WithoutCompact)

export const MediaPicker = ({
  accept = 'image/jpeg, image/png, image/webp, image/gif, video/mp4, video/ogg, video/webm',
  autoFocus,
  compact,
  cover,
  defaultValue,
  disabled,
  error,
  id,
  label,
  maxSize = 5,
  name,
  required,
  tabIndex,
  uploaded,
  uploading,
  uploadProgress,
  onBlur,
  onChange,
  onError,
  onFocus,
  onReset,
}: Props) => {
  const hasError = error ? true : undefined
  return (
    <FileInput
      accept={accept}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      id={id}
      maxSize={maxSize}
      name={name}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onChange={onChange}
      onError={onError}
      onFocus={onFocus}
      onReset={onReset}
    >
      {(context) => (
        <Box position="relative">
          <Box
            className={styles.root({
              disabled,
              droppable: context.droppable,
              focused: context.focused,
            })}
          >
            <Box className={styles.label({ compact, disabled })}>
              <MediaPreview
                compact={compact}
                fileName={context.name}
                fileType={context.type}
                hasError={hasError}
                previewUrl={context.previewUrl}
                uploading={uploading}
              />
              <Box as="span" className={styles.content({ compact })}>
                <Box
                  as="span"
                  color={context.file ? 'text' : 'textSecondary'}
                  fontSize={compact ? 'base' : 'large'}
                  fontWeight="semiBold"
                  wordBreak="break-word"
                >
                  {!cover && context.file ? (
                    context.file.name
                  ) : (
                    <>
                      {label}{' '}
                      {required && (
                        <VisuallyHidden as="span">(required)</VisuallyHidden>
                      )}
                    </>
                  )}
                </Box>
                <MediaTag
                  compact={compact}
                  error={error}
                  maxSize={maxSize}
                  uploadProgress={uploadProgress}
                  uploaded={uploaded}
                  uploading={uploading}
                />
              </Box>
            </Box>

            {cover && context.type && context.previewUrl && (
              <Box
                display="flex"
                inset="0"
                justifyContent="center"
                position="absolute"
              >
                <Media
                  cover
                  name={context.name}
                  type={context.type}
                  url={context.previewUrl}
                />
              </Box>
            )}
          </Box>

          {context.type && (
            <Box position="absolute" right="2" top="2">
              <RemoveButton
                cover={cover}
                uploading={uploading}
                onClick={context.reset}
              />
            </Box>
          )}
        </Box>
      )}
    </FileInput>
  )
}

MediaPicker.displayName = 'MediaPicker'

type MediaProps = {
  cover?: boolean
  name?: string
  type: string
  url: string
}

const Media = ({ cover, name, type, url }: MediaProps) => {
  const boxProps: BoxProps = cover
    ? { className: styles.cover }
    : {
        maxHeight: 'full',
        maxWidth: 'full',
      }
  if (type.includes('image'))
    return <Box alt={name} as="img" src={url} {...boxProps} />
  else if (type.includes('video'))
    return <Box as="video" autoPlay loop muted src={url} {...boxProps} />
  return null
}

type MediaPreviewProps = Pick<Props, 'compact' | 'uploading'> & {
  fileName?: string
  fileType?: string
  hasError?: boolean
  previewUrl?: string
}

const MediaPreview = ({
  compact,
  fileName,
  fileType,
  hasError,
  previewUrl,
  uploading,
}: MediaPreviewProps) => {
  let content: React.ReactNode
  if (uploading) content = <Spinner />
  else if (fileType && previewUrl)
    content = <Media name={fileName} type={fileType} url={previewUrl} />
  else if (hasError) content = <IconExclamation />
  else content = <IconUpload />

  return (
    <Box as="span" className={styles.preview({ compact })}>
      {content}
    </Box>
  )
}

type MediaTagProps = Pick<
  Props,
  'compact' | 'error' | 'maxSize' | 'uploadProgress' | 'uploaded' | 'uploading'
>

const MediaTag = ({
  compact,
  error,
  maxSize,
  uploadProgress,
  uploaded,
  uploading,
}: MediaTagProps) => {
  let statusProps: Parameters<typeof Tag>[0] | undefined
  if (uploading)
    statusProps = {
      tone: 'accent',
      ...(uploadProgress
        ? { label: 'Uploading', children: `${uploadProgress * 100}%` }
        : { children: 'Uploading' }),
    }
  else if (uploaded) statusProps = { children: 'Success', tone: 'green' }
  else if (error)
    statusProps = {
      tone: 'red',
      ...(typeof error === 'string'
        ? { label: 'Error', children: error }
        : { children: 'Error' }),
    }
  else if (maxSize !== undefined)
    statusProps = {
      label: 'Maximum size',
      children: `${maxSize} MB`,
    }

  if (!statusProps) return null
  return <Tag as="span" size={compact ? 'small' : 'medium'} {...statusProps} />
}

type RemoveButtonProps = Pick<Props, 'cover' | 'uploading'> & {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

const RemoveButton = ({ cover, uploading, onClick }: RemoveButtonProps) => {
  const content = (
    <>
      <VisuallyHidden>Remove Media</VisuallyHidden>
      <IconClose />
    </>
  )
  if (cover)
    return (
      <Box
        alignItems="center"
        as="button"
        borderRadius="full"
        className={styles.removeButton}
        cursor="pointer"
        disabled={uploading}
        display="flex"
        height="12"
        justifyContent="center"
        width="12"
        onClick={onClick}
      >
        {uploading ? <Spinner /> : content}
      </Box>
    )

  return (
    <Button shape="circle" size="small" variant="transparent" onClick={onClick}>
      {content}
    </Button>
  )
}
