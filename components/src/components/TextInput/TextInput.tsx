import * as React from 'react'

import { Atoms } from '~/css'

import { ReactNodeNoStrings } from '~/types'
import { isOfType } from '~/utils'
import { Box } from '../Box'
import { Field, FieldBaseProps } from '../Field'
import * as styles from './styles.css'

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = FieldBaseProps & {
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
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef

    const [state, setState] = React.useState<{ ghostValue: Props['value'] }>({
      ghostValue: value || defaultValue,
    })

    const hasError = error ? true : undefined
    const className = styles.variants({
      icon: icon ? true : undefined,
      prefix: prefix ? true : undefined,
    })

    const inputProps = React.useMemo(() => {
      let inputProps = {}
      if (isOfType<WithTypeText>(props, 'maxLength')) {
        const { maxLength } = props
        inputProps = { maxLength }
      } else if (isOfType<WithTypeNumber>(props, ['max', 'min'])) {
        const { max, min } = props
        inputProps = { max, min }
      }
      return inputProps
    }, [props])

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

    const max = (props as WithTypeNumber).max
    const handleMax = React.useCallback(() => {
      if (!inputRef.current) return
      inputRef.current.value = max as string
    }, [max, inputRef])

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
                ref={inputRef}
                tabIndex={tabIndex}
                textTransform={textTransform}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={handleChange}
                onFocus={onFocus}
                {...inputProps}
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
