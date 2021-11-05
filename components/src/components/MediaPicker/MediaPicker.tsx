import * as React from 'react'

import { useFieldIds } from '../../hooks'
import { Box, BoxProps } from '../Box'
import { Button } from '../Button'
import { IconClose, IconExclamation, IconUpload } from '../icons'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'
import { validateAccept } from './utils'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>
type Image =
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/webp'
  | 'image/gif, image/jpeg, image/png, image/webp'
type Video =
  | 'video/mp4'
  | 'video/ogg'
  | 'video/webm'
  | 'video/mp4, video/ogg, video/webm'
export type Accept = Image | Video | `${Image}, ${Video}`

type BaseProps = {
  accept?: Accept
  autoFocus?: NativeInputProps['autoFocus']
  defaultValue?: { name?: string; type: string; url: string }
  disabled?: boolean
  error?: boolean | React.ReactNode
  id?: NativeInputProps['id']
  label: React.ReactNode
  /** Size in megabytes */
  maxSize?: number
  name?: string
  required?: NativeInputProps['required']
  tabIndex?: NativeInputProps['tabIndex']
  uploaded?: boolean
  uploading?: boolean
  uploadProgress?: number
  onBlur?: NativeInputProps['onBlur']
  onError?(error: string): void
  onChange?(file: File): void
  onFocus?: NativeInputProps['onFocus']
  onReset?(): void
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

type State = {
  droppable?: boolean
  file?: File
  name?: string
  type?: string
  previewUrl?: string
}

const initialState: State = {}

export const MediaPicker = React.forwardRef(
  (
    {
      accept = 'image/gif, image/jpeg, image/png, image/webp, video/mp4, video/ogg, video/webm',
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
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const [state, setState] = React.useState<State>(initialState)

    const hasError = error ? true : undefined
    const ids = useFieldIds({
      id,
      error: hasError,
    })

    const handleFile = React.useCallback(
      (file: File, event?: React.ChangeEvent | React.DragEvent) => {
        // Disallow file larger than max
        if (maxSize && file.size > maxSize * 1_000_000) {
          event?.preventDefault()
          onError && onError(`File must be smaller than ${maxSize} MB`)
          return
        }
        setState((x) => ({
          ...x,
          file,
          name: file.name,
          type: file.type,
        }))
        onChange && onChange(file)
      },
      [maxSize, onChange, onError],
    )

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files?.length) return
        handleFile(files[0], event)
      },
      [handleFile],
    )

    const handleDragOver = React.useCallback(
      (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState((x) => ({ ...x, droppable: true }))
      },
      [],
    )

    const handleDragExit = React.useCallback(
      (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState((x) => ({ ...x, droppable: false }))
      },
      [],
    )

    const handleDrop = React.useCallback(
      (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault()
        let file: File | null
        if (event.dataTransfer.items) {
          const files = event.dataTransfer.items
          if (files?.[0].kind !== 'file') return
          file = files[0].getAsFile()
          if (!file) return
        } else {
          const files = event.dataTransfer.files
          if (!files?.length) return
          file = files[0]
        }
        if (!validateAccept(file.type, accept)) return
        handleFile(file, event)
      },
      [handleFile, accept],
    )

    /* eslint-disable react-hooks/exhaustive-deps */
    const handleReset = React.useCallback(
      (_event: React.MouseEvent<HTMLButtonElement>) => {
        setState(initialState)
        if (inputRef.current) inputRef.current.value = ''
        onReset && onReset()
      },
      // No need to add defaultValue
      [inputRef, onReset],
    )
    /* eslint-enable react-hooks/exhaustive-deps */

    // Display preview for default value
    /* eslint-disable react-hooks/exhaustive-deps */
    React.useEffect(() => {
      if (!defaultValue) return
      setState({
        previewUrl: defaultValue.url,
        name: defaultValue.name,
        type: defaultValue.type,
      })
    }, [])
    /* eslint-enable react-hooks/exhaustive-deps */

    // Create URL for displaying media preview
    React.useEffect(() => {
      if (!state.file) return
      const previewUrl = URL.createObjectURL(state.file)
      setState((x) => ({ ...x, previewUrl }))
      return () => URL.revokeObjectURL(previewUrl)
    }, [state.file])

    return (
      <Box position="relative">
        <Box
          className={styles.root({
            disabled,
            droppable: state.droppable,
          })}
        >
          <VisuallyHidden>
            <Box
              accept={accept}
              aria-invalid={hasError}
              as="input"
              autoFocus={autoFocus}
              disabled={disabled}
              name={name}
              ref={inputRef}
              tabIndex={tabIndex}
              type="file"
              onBlur={onBlur}
              onChange={handleChange}
              onFocus={onFocus}
              {...ids.content}
            />
          </VisuallyHidden>

          <Box
            as="label"
            className={styles.label({
              compact,
              disabled,
            })}
            {...ids.label}
            onDragExit={handleDragExit}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <MediaPreview
              compact={compact}
              fileName={state.name}
              fileType={state.type}
              hasError={hasError}
              previewUrl={state.previewUrl}
              uploading={uploading}
            />
            <Box
              as="span"
              className={styles.content({
                compact,
              })}
            >
              <Box
                as="span"
                color={state.file ? 'text' : 'textSecondary'}
                fontSize={compact ? 'base' : 'large'}
                fontWeight="semiBold"
                wordBreak="break-word"
              >
                {state.file ? (
                  state.file.name
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

          {cover && state.type && state.previewUrl && (
            <Media
              cover
              name={state.name}
              type={state.type}
              url={state.previewUrl}
            />
          )}
        </Box>

        {state.type && (
          <Box position="absolute" right="2" top="2">
            <Button
              disabled={cover && uploading}
              loading={cover && uploading}
              shape="circle"
              size="small"
              variant={cover ? 'secondary' : 'transparent'}
              onClick={handleReset}
            >
              <VisuallyHidden>Remove Media</VisuallyHidden>
              <IconClose color="textTertiary" />
            </Button>
          </Box>
        )}
      </Box>
    )
  },
)

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
