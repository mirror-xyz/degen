import * as React from 'react'

import { Atoms } from '~/css'

import { ReactNodeNoStrings } from '~/types'
import { Box } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type Props = FieldBaseProps & {
  autoFocus?: NativeInputProps['autoFocus']
  defaultValue?: string | number
  disabled?: true
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

export const TextInput = React.forwardRef(
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
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [state, setState] = React.useState<{ ghostValue: Props['value'] }>({
      ghostValue: value || defaultValue,
    })

    const hasError = error ? true : undefined
    const className = styles.variants({
      icon: icon ? true : undefined,
      prefix: prefix ? true : undefined,
    })

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (units) {
          console.log(event.target)
          const value = event.target.value
          setState((x) => ({ ...x, ghostValue: value }))
        }
        onChange && onChange(event)
      },
      [units, onChange],
    )

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        required={required}
      >
        {(ids) => (
          <Box
            className={styles.root({
              disabled,
              error: hasError,
            })}
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
                placeholder={placeholder}
                readOnly={readOnly}
                ref={ref}
                tabIndex={tabIndex}
                textTransform={textTransform}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={handleChange}
                onFocus={onFocus}
                {...ids?.content}
              />

              {units && (
                <Box aria-hidden="true" className={[className, styles.ghost]}>
                  <Box
                    as="span"
                    textTransform={textTransform}
                    visibility="hidden"
                  >
                    {state.ghostValue || placeholder}
                  </Box>
                  <Box
                    as="span"
                    color={state.ghostValue ? 'text' : 'textSecondary'}
                  >
                    {' '}
                    {units}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Field>
    )
  },
)
