import * as React from 'react'

import { Box } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeTextareaProps = React.AllHTMLAttributes<HTMLTextAreaElement>

type Props = FieldBaseProps & {
  autoCorrect?: NativeTextareaProps['autoCorrect']
  autoFocus?: NativeTextareaProps['autoFocus']
  defaultValue?: string | number
  disabled?: boolean
  id?: NativeTextareaProps['id']
  name?: string
  maxLength?: NativeTextareaProps['maxLength']
  placeholder?: NativeTextareaProps['placeholder']
  readOnly?: NativeTextareaProps['readOnly']
  rows?: NativeTextareaProps['rows']
  spellCheck?: NativeTextareaProps['spellCheck']
  tabIndex?: NativeTextareaProps['tabIndex']
  value?: string | number
  onChange?: React.EventHandler<React.ChangeEvent<HTMLTextAreaElement>>
  onBlur?: NativeTextareaProps['onBlur']
  onFocus?: NativeTextareaProps['onFocus']
}

export const Textarea = React.forwardRef(
  (
    {
      autoCorrect,
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
      spellCheck,
      tabIndex,
      value,
      width,
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
        width={width}
      >
        <Box
          aria-invalid={hasError}
          as="textarea"
          autoCorrect={autoCorrect}
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
          spellCheck={spellCheck}
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
