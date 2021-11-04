import * as React from 'react'

import { Box } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeTextareaProps = React.AllHTMLAttributes<HTMLTextAreaElement>

type Props = FieldBaseProps & {
  autoFocus?: NativeTextareaProps['autoFocus']
  defaultValue?: string | number
  disabled?: boolean
  id?: NativeTextareaProps['id']
  name?: string
  maxLength?: NativeTextareaProps['maxLength']
  placeholder?: NativeTextareaProps['placeholder']
  readOnly?: NativeTextareaProps['readOnly']
  rows?: NativeTextareaProps['rows']
  tabIndex?: NativeTextareaProps['tabIndex']
  value?: string | number
  onChange?: React.EventHandler<React.ChangeEvent<HTMLTextAreaElement>>
  onBlur?: NativeTextareaProps['onBlur']
  onFocus?: NativeTextareaProps['onFocus']
}

export const Textarea = React.forwardRef(
  (
    {
      autoFocus,
      defaultValue,
      description,
      disabled,
      error,
      hideLabel,
      id,
      label,
      labelSecondary,
      maxLength,
      name,
      placeholder,
      readOnly,
      required,
      rows = 5,
      tabIndex,
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

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        labelSecondary={labelSecondary}
        required={required}
      >
        <Box
          aria-invalid={hasError}
          as="textarea"
          autoFocus={autoFocus}
          className={styles.variants({
            disabled,
            error: hasError,
          })}
          defaultValue={defaultValue}
          disabled={disabled}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={inputRef}
          rows={rows}
          tabIndex={tabIndex}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'
