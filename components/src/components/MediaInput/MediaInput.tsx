import * as React from 'react'

import { useFieldIds } from '../../hooks'
import { Box } from '../Box'
import { Button } from '../Button'
import { IconClose, IconDocument, IconExclamation, IconUpload } from '../icons'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = {
  accept?: NativeInputProps['accept']
  autoFocus?: NativeInputProps['autoFocus']
  defaultValue?: { type: string; url: string } | File
  disabled?: boolean
  error?: boolean | React.ReactNode
  id?: NativeInputProps['id']
  label: React.ReactNode
  /** Size in megabytes */
  maxSize?: number
  name?: string
  readOnly?: NativeInputProps['readOnly']
  required?: NativeInputProps['required']
  tabIndex?: NativeInputProps['tabIndex']
  uploaded?: boolean
  uploading?: boolean
  uploadProgress?: number
  onBlur?: NativeInputProps['onBlur']
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onFocus?: NativeInputProps['onFocus']
  onReset?(): void
}

type WithoutCompact = {
  compact?: never
  cover?: boolean
}

type WithCompact = {
  /** Show a smaller input */
  compact?: boolean
  cover?: never
}

type Props = BaseProps & (WithCompact | WithoutCompact)

type State = {
  file?: File
  name?: string
  type?: string
  previewUrl?: string
}

const initialState: State = {}

export const MediaInput = React.forwardRef(
  (
    {
      accept,
      autoFocus,
      compact,
      defaultValue,
      disabled,
      error,
      id,
      label,
      maxSize,
      name,
      readOnly,
      required,
      tabIndex,
      uploaded,
      uploading,
      uploadProgress,
      onBlur,
      onChange,
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

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files?.length) return
        const file = files[0]
        setState((x) => ({ ...x, file, name: file.name, type: file.type }))
        onChange && onChange(event)
      },
      [onChange],
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
      const previewUrl = (defaultValue as any)?.url
      setState({
        file: !previewUrl ? (defaultValue as File) : undefined,
        previewUrl,
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
        children: `${maxSize}mb`,
      }

    return (
      <Box position="relative">
        <Box
          className={styles.root({
            disabled,
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
              readOnly={readOnly}
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
              {statusProps && (
                <Tag
                  as="span"
                  size={compact ? 'small' : 'medium'}
                  {...statusProps}
                />
              )}
            </Box>
          </Box>
        </Box>

        {state.type && (
          <Box position="absolute" right="2" top="2">
            <Button
              shape="circle"
              size="small"
              variant="transparent"
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

MediaInput.displayName = 'MediaInput'

type MediaPreviewProps = {
  compact: Props['compact']
  fileName?: string
  fileType?: string
  hasError?: boolean
  previewUrl?: string
  uploading?: Props['uploading']
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
  else if (fileType && previewUrl) {
    if (fileType.includes('image'))
      content = (
        <Box
          alt={fileName}
          as="img"
          maxHeight="full"
          maxWidth="full"
          src={previewUrl}
        />
      )
    else if (fileType.includes('video'))
      content = (
        <Box
          as="video"
          autoPlay
          loop
          maxHeight="full"
          maxWidth="full"
          muted
          src={previewUrl}
        />
      )
    else content = <IconDocument />
  } else if (hasError) content = <IconExclamation />
  else content = <IconUpload />

  return (
    <Box
      as="span"
      className={styles.preview({
        compact,
      })}
    >
      {content}
    </Box>
  )
}
