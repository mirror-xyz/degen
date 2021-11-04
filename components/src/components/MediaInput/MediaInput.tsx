import * as React from 'react'

import { useFieldIds } from '../../hooks'
import { Box } from '../Box'
import { IconExclamation, IconUpload } from '../icons'
import { Spinner } from '../Spinner'
import { Tag } from '../Tag'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type Props = {
  accept?: NativeInputProps['accept']
  autoFocus?: NativeInputProps['autoFocus']
  compact?: boolean
  defaultValue?: string | number
  disabled?: boolean
  error?: React.ReactNode
  id?: NativeInputProps['id']
  label: React.ReactNode
  /** Size in megabytes */
  maxSize?: number
  name?: string
  readOnly?: NativeInputProps['readOnly']
  required?: NativeInputProps['required']
  tabIndex?: NativeInputProps['tabIndex']
  uploading?: boolean
  value?: string | number
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onBlur?: NativeInputProps['onBlur']
  onFocus?: NativeInputProps['onFocus']
}

export const MediaInput = React.forwardRef(
  (
    {
      accept,
      autoFocus,
      compact = false,
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
      uploading,
      value,
      onChange,
      onBlur,
      onFocus,
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    const hasError = error ? true : undefined
    const ids = useFieldIds({
      id,
      error: hasError,
    })

    const labelContent = (
      <Box
        as="label"
        className={styles.label({
          compact,
          disabled,
        })}
        {...ids.label}
      >
        <Box
          className={styles.preview({
            compact,
          })}
        >
          {(() => {
            if (uploading) return <Spinner />
            if (hasError) return <IconExclamation />
            return <IconUpload />
          })()}
        </Box>

        <Box
          className={styles.content({
            compact,
          })}
        >
          <Box color="text" fontSize="large" fontWeight="semiBold">
            {label} {required && <VisuallyHidden>(required)</VisuallyHidden>}
          </Box>

          {(() => {
            if (uploading) return <Tag tone="accent">Uploading</Tag>
            if (hasError) return <Tag tone="red">Error</Tag>
            if (maxSize !== undefined)
              return <Tag label="Maximum size">{maxSize}mb</Tag>
            return null
          })()}
        </Box>
      </Box>
    )

    return (
      <Box
        className={styles.root({
          disabled,
          error: hasError,
        })}
      >
        {labelContent}
        <VisuallyHidden>
          <Box
            accept={accept}
            aria-invalid={hasError}
            as="input"
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            readOnly={readOnly}
            ref={inputRef}
            tabIndex={tabIndex}
            type="file"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            {...ids.content}
          />
        </VisuallyHidden>
      </Box>
    )
  },
)

MediaInput.displayName = 'MediaInput'
