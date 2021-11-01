import * as React from 'react'

import { Atoms } from '../../css'
import { ReactNodeNoStrings } from '../../types'
import { Box } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = FieldBaseProps & {
  autoFocus?: NativeInputProps['autoFocus']
  defaultValue?: string | number
  disabled?: boolean
  icon?: ReactNodeNoStrings
  id?: NativeInputProps['id']
  inputMode?: NativeInputProps['inputMode']
  name?: string
  placeholder?: NativeInputProps['placeholder']
  prefix?: string
  readOnly?: NativeInputProps['readOnly']
  tabIndex?: NativeInputProps['tabIndex']
  textTransform?: Atoms['textTransform']
  type?: 'number' | 'text'
  units?: string
  value?: string | number
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onBlur?: NativeInputProps['onBlur']
  onFocus?: NativeInputProps['onFocus']
}

type WithTypeText = {
  type?: 'text'
  maxLength?: NativeInputProps['maxLength']
}

type WithTypeNumber = {
  type?: 'number'
  max?: NativeInputProps['max']
  min?: NativeInputProps['min']
}

type Props = BaseProps & (WithTypeText | WithTypeNumber)

export const Input = React.forwardRef(
  (
    {
      autoFocus,
      defaultValue,
      description,
      disabled,
      error,
      hideLabel,
      icon,
      id,
      inputMode,
      label,
      labelSecondary,
      name,
      placeholder,
      prefix,
      readOnly,
      required,
      tabIndex,
      textTransform,
      type = 'text',
      units,
      value,
      onChange,
      onBlur,
      onFocus,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    const [state, setState] = React.useState<{
      ghostValue?: Props['value']
    }>({ ghostValue: value || defaultValue })

    const placeholderText = placeholder
      ? `${placeholder ?? ''}${units ? ` ${units}` : ''}`
      : undefined
    const hasError = error ? true : undefined
    const className = styles.variants({
      icon: icon ? true : undefined,
      prefix: prefix ? true : undefined,
    })
    const max = (props as WithTypeNumber).max

    const handleInput = React.useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setState((x) => ({ ...x, ghostValue: value }))
      },
      [],
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === 'number' && units) {
          const key = event.key
          const filteredKeys = ['E', 'e', '+']
          if (filteredKeys.includes(key)) event.preventDefault()
        }
      },
      [type, units],
    )

    const handleMax = React.useCallback(() => {
      if (onChange)
        onChange({
          target: { value: max },
        } as React.ChangeEvent<HTMLInputElement>)
      else if (inputRef.current) inputRef.current.value = max as string
      if (!units) return
      setState((x) => ({ ...x, ghostValue: max }))
    }, [inputRef, max, units, onChange])

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
        {(ids) => (
          <Box
            className={[
              styles.root({
                disabled,
                error: hasError,
              }),
              styles.maxParent,
            ]}
          >
            {icon && (
              <Box
                aria-hidden="true"
                as="label"
                className={styles.icon}
                {...ids?.label}
              >
                {icon}
              </Box>
            )}
            {prefix && (
              <Box
                aria-hidden="true"
                as="label"
                className={styles.prefix}
                {...ids?.label}
              >
                {prefix}
              </Box>
            )}

            <Box overflow="hidden" position="relative" width="full">
              <Box
                aria-invalid={hasError}
                as="input"
                autoFocus={autoFocus}
                className={[className, styles.input]}
                defaultValue={defaultValue}
                disabled={disabled}
                inputMode={inputMode}
                name={name}
                placeholder={placeholderText}
                readOnly={readOnly}
                ref={inputRef}
                tabIndex={tabIndex}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onInput={handleInput}
                onKeyDown={units ? handleKeyDown : undefined}
                {...props}
                {...ids?.content}
              />

              {units && state.ghostValue && (
                <Box
                  aria-hidden="true"
                  className={[className, styles.ghost]}
                  data-testid="ghost"
                >
                  <Box
                    as="span"
                    textTransform={textTransform}
                    visibility="hidden"
                  >
                    {state.ghostValue}{' '}
                  </Box>
                  <Box as="span" color="text">
                    {units}
                  </Box>
                </Box>
              )}
            </Box>

            {max && (
              <Box alignItems="center" display="flex" paddingRight="4">
                <Box as="button" className={styles.max} onClick={handleMax}>
                  Max
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Field>
    )
  },
)

Input.displayName = 'Input'
