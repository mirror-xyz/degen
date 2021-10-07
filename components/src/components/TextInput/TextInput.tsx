import * as React from 'react'

import { Atoms } from '~/css'

import { ReactNodeNoStrings } from '~/types'
import { Box } from '../Box'
import { Context, Field, FieldBaseProps } from '../Field'
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

const InnerTextInput = ({
  autoFocus,
  defaultValue,
  disabled,
  error,
  name,
  icon,
  inputMode,
  placeholder,
  prefix,
  readOnly,
  ref,
  tabIndex,
  textTransform,
  type = 'text',
  units,
  value,
  onChange,
  onBlur,
  onFocus,
}: Props & { ref: React.Ref<HTMLInputElement> }) => {
  const ids = React.useContext(Context)
  const [state, setState] = React.useState<{ value: Props['value'] }>({
    value: defaultValue,
  })

  let ghostValue: Props['value']
  if (value) ghostValue = value
  else if (state.value) ghostValue = state.value
  else if (placeholder) ghostValue = placeholder
  const showUnits = units && ghostValue !== undefined

  const className = styles.variants({
    icon: icon ? true : undefined,
    prefix: prefix ? true : undefined,
  })

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      !onChange && setState((x) => ({ ...x, value: event.target.value }))
      onChange && onChange(event)
    },
    [onChange],
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle `.` and `e` for number inputs
      if (type === 'number') {
        const key = event.key
        if (key === '.' || key === 'e') {
          setState((x) => ({
            ...x,
            value: !x.value?.toString().includes(key)
              ? `${x.value ?? ''}${key}`
              : x.value,
          }))
        } else if (key === 'Backspace') {
          if (!(event.target as any).value) return
          setState((x) => {
            const value = x.value?.toString()
            return {
              ...x,
              value: value?.endsWith('.')
                ? value.slice(0, value?.length - 1)
                : x.value,
            }
          })
        }
      }
    },
    [type],
  )

  return (
    <Box
      className={styles.root({
        disabled,
        error: error ? true : undefined,
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
          onKeyDown={handleKeyDown}
          {...ids?.content}
        />

        {showUnits && (
          <Box aria-hidden="true" className={[className, styles.ghost]}>
            <Box as="span" visibility="hidden">
              {ghostValue}
            </Box>
            <Box
              as="span"
              color={value || state.value ? 'text' : 'textSecondary'}
            >
              {' '}
              {units}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export const TextInput = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement>) => {
    const { description, error, hideLabel, id, label, required } = props
    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        required={required}
      >
        <InnerTextInput {...props} ref={ref} />
      </Field>
    )
  },
)
