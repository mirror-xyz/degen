import * as React from 'react'

import { ReactNodeNoStrings } from '../../types'
import { useFieldIds } from '../../hooks'
import { Box } from '../Box'
import { VisuallyHidden } from '../VisuallyHidden'
import { validateAccept } from './utils'

type State = {
  droppable?: boolean
  file?: File
  focused?: boolean
  name?: string
  previewUrl?: string
  type?: string
}

const initialState: State = {}

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>
export type Props = {
  accept?: NativeInputProps['accept']
  autoFocus?: NativeInputProps['autoFocus']
  children: (
    context: State & {
      reset(event: React.MouseEvent<HTMLElement>): void
    },
  ) => ReactNodeNoStrings
  defaultValue?: { name?: string; type: string; url: string }
  disabled?: NativeInputProps['disabled']
  error?: boolean | React.ReactNode
  id?: NativeInputProps['id']
  /** Size in megabytes */
  maxSize?: number
  name?: string
  required?: NativeInputProps['required']
  tabIndex?: NativeInputProps['tabIndex']
  onBlur?: NativeInputProps['onBlur']
  onError?(error: string): void
  onChange?(file: File): void
  onFocus?: NativeInputProps['onFocus']
  onReset?(): void
}

export const FileInput = React.forwardRef(
  (
    {
      accept,
      autoFocus,
      children,
      defaultValue,
      disabled,
      error,
      id,
      maxSize,
      name,
      required,
      tabIndex,
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
          onError &&
            onError(
              `File is ${(file.size / 1_000_000).toFixed(
                2,
              )} MB. Must be smaller than ${maxSize} MB`,
            )
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

    const handleDragLeave = React.useCallback(
      (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState((x) => ({ ...x, droppable: false }))
      },
      [],
    )

    const handleDrop = React.useCallback(
      (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState((x) => ({ ...x, droppable: false }))
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

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, focused: true }))
        onFocus && onFocus(event)
      },
      [onFocus],
    )

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, focused: false }))
        onBlur && onBlur(event)
      },
      [onBlur],
    )

    /* eslint-disable react-hooks/exhaustive-deps */
    const reset = React.useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
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
      <Box ref={ref}>
        <VisuallyHidden>
          <Box
            accept={accept}
            aria-invalid={hasError}
            as="input"
            autoFocus={autoFocus}
            disabled={disabled}
            name={name}
            ref={inputRef}
            required={required}
            tabIndex={tabIndex}
            type="file"
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            {...ids.content}
          />
        </VisuallyHidden>

        <Box
          as="label"
          {...ids.label}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {children({ ...state, reset })}
        </Box>
      </Box>
    )
  },
)

FileInput.displayName = 'FileInput'
