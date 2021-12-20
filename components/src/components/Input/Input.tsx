import * as React from 'react'

import { Box, BoxProps } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = FieldBaseProps & {
  autoFocus?: NativeInputProps['autoFocus']
  autoComplete?: NativeInputProps['autoComplete']
  autoCorrect?: NativeInputProps['autoCorrect']
  defaultValue?: string | number
  disabled?: boolean
  id?: NativeInputProps['id']
  inputMode?: NativeInputProps['inputMode']
  name?: string
  placeholder?: NativeInputProps['placeholder']
  prefix?: React.ReactNode
  readOnly?: NativeInputProps['readOnly']
  spellCheck?: NativeInputProps['spellCheck']
  suffix?: React.ReactNode
  tabIndex?: NativeInputProps['tabIndex']
  textTransform?: BoxProps['textTransform']
  type?: 'email' | 'number' | 'text'
  units?: string
  value?: string | number
  onBlur?: NativeInputProps['onBlur']
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
  onFocus?: NativeInputProps['onFocus']
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

type WithTypeEmail = {
  type?: 'email'
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

type Props = BaseProps & (WithTypeEmail | WithTypeText | WithTypeNumber)

export const Input = React.forwardRef(
  (
    {
      autoFocus,
      autoComplete,
      autoCorrect,
      defaultValue,
      description,
      disabled,
      error,
      hideLabel,
      id,
      inputMode,
      label,
      labelSecondary,
      name,
      placeholder,
      prefix,
      readOnly,
      required,
      spellCheck,
      suffix,
      tabIndex,
      textTransform,
      type = 'text',
      units,
      value,
      width,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
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
      prefix: prefix ? true : undefined,
      suffix: suffix ? true : undefined,
    })
    const max = (props as WithTypeNumber).max
    const inputType = type === 'number' ? 'number' : 'text'

    const handleInput = React.useCallback(
      (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setState((x) => ({ ...x, ghostValue: value }))
      },
      [],
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === 'number') {
          const key = event.key
          const filteredKeys = ['E', 'e', '+']
          if (filteredKeys.includes(key)) event.preventDefault()
        }
        onKeyDown && onKeyDown(event)
      },
      [type, onKeyDown],
    )

    const handleWheel = React.useCallback(
      (event: React.WheelEvent<HTMLElement>) => {
        ;(event.target as HTMLElement)?.blur()
      },
      [],
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
        width={width}
      >
        {(ids) => (
          <Box
            className={[
              styles.root({
                disabled,
                error: hasError,
              }),
              styles.inputParent,
            ]}
          >
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
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                className={[
                  className,
                  styles.input({
                    disabled,
                    type: inputType,
                  }),
                ]}
                defaultValue={defaultValue}
                disabled={disabled}
                inputMode={inputMode}
                name={name}
                placeholder={placeholderText}
                readOnly={readOnly}
                ref={inputRef}
                spellCheck={spellCheck}
                tabIndex={tabIndex}
                textTransform={textTransform}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onInput={handleInput}
                onKeyDown={type === 'number' ? handleKeyDown : onKeyDown}
                onWheel={type === 'number' ? handleWheel : undefined}
                {...props}
                {...ids?.content}
              />

              {units && state.ghostValue && (
                <Box
                  aria-hidden="true"
                  className={[
                    className,
                    styles.ghost({
                      type: inputType,
                    }),
                  ]}
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
              <Box
                alignItems="center"
                display="flex"
                paddingRight={suffix ? undefined : '4'}
              >
                <Box as="button" className={styles.max} onClick={handleMax}>
                  Max
                </Box>
              </Box>
            )}

            {suffix && (
              <Box
                aria-hidden="true"
                as="label"
                className={styles.suffix}
                {...ids?.label}
              >
                {suffix}
              </Box>
            )}
          </Box>
        )}
      </Field>
    )
  },
)

Input.displayName = 'Input'
