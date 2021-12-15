import * as React from 'react'
import computeScrollIntoView from 'compute-scroll-into-view'

import { useId, useWindowEvent } from '../../hooks'
import { Box, BoxProps } from '../Box'
import { Input, InputProps } from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'
import { Stack } from '../Stack'
import { Spinner } from '../Spinner'
import { IconCheck, IconClose } from '../icons'
import { getNextWrappingIndex } from './utils'
import * as styles from './styles.css'

export type Option = {
  label: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value: number | string
}

type Props = Pick<
  InputProps,
  | 'autoFocus'
  | 'disabled'
  | 'hideLabel'
  | 'id'
  | 'label'
  | 'name'
  | 'placeholder'
  | 'readOnly'
  | 'tabIndex'
  | 'textTransform'
  | 'onBlur'
  | 'onFocus'
> & {
  defaultValue?: string
  emptyText?: string
  loading?: boolean
  options?: Option[]
  filter?: (options: Option[], inputValue: string) => Option[]
  value?: string
  onChange?(value: Option['value']): void
}

export const Combobox = React.forwardRef(
  (
    {
      autoFocus,
      defaultValue,
      disabled,
      emptyText = 'No results',
      filter,
      hideLabel,
      id: contentId,
      label,
      loading,
      name,
      options = [],
      placeholder,
      readOnly,
      tabIndex,
      textTransform,
      value,
      onChange,
      onBlur,
      onFocus,
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const rootRef = React.useRef<HTMLElement>(null)

    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const optionRefs = React.useRef<Record<string, HTMLElement>>({})
    const menuRef = React.useRef<HTMLElement>(null)

    const [state, setState] = React.useState<{
      changed?: boolean
      highlightedIndex?: number
      inputValue: string
      open: boolean
      selectedOption?: Option
    }>(() => {
      const inputValue = (value || defaultValue) ?? ''
      const selectedOption = options.find((x) => x.value === inputValue)
      return {
        changed: false,
        inputValue,
        open: false,
        selectedOption,
      }
    })

    const _id = useId()
    const id = `${_id}${contentId ? `-${contentId}` : ''}`
    const listboxId = `${id}-listbox`
    const elementIdsRef = React.useRef({
      getItemId: (index: number) => `${id}-option-${index}`,
    })

    // Whenever internal value changes, filter options
    const filteredOptions = React.useMemo(() => {
      if (state.inputValue === state.selectedOption?.label && !state.changed)
        return options
      return state.inputValue && filter
        ? filter(options, state.inputValue)
        : options
    }, [filter, options, state.changed, state.inputValue, state.selectedOption])
    const filteredOptionsLength = filteredOptions.length

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((x) => ({
          ...x,
          changed: true,
          inputValue: event.target.value,
        }))
      },
      [],
    )

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, changed: false, open: true }))
        onFocus?.(event)
      },
      [onFocus],
    )

    const scrollIntoView = React.useCallback(
      (index) => {
        const node = optionRefs.current[elementIdsRef.current.getItemId(index)]
        const actions = computeScrollIntoView(node, {
          block: 'nearest',
          scrollMode: 'if-needed',
        })
        actions.forEach(({ el, top }) => (el.scrollTop = top))
      },
      [elementIdsRef],
    )

    const onArrowKeyEvent = React.useCallback(
      (event: React.KeyboardEvent) => {
        let nextIndex: number | undefined
        switch (event.key) {
          case 'ArrowUp':
          case 'ArrowDown': {
            const direction = event.key === 'ArrowUp' ? -1 : 1
            const moveAmount = event.shiftKey ? 3 : 1
            nextIndex = getNextWrappingIndex(
              moveAmount * direction,
              state.highlightedIndex ?? -1,
              filteredOptionsLength,
              true,
            )
            break
          }
          case 'End': {
            nextIndex = filteredOptionsLength - 1
            break
          }
          case 'Home': {
            nextIndex = 0
            break
          }
          default:
            return
        }
        if (nextIndex === undefined) return
        setState((x) => ({ ...x, highlightedIndex: nextIndex }))
        scrollIntoView(nextIndex)
      },
      [filteredOptionsLength, state.highlightedIndex, scrollIntoView],
    )

    const handleSelect = React.useCallback(
      (option?: Option) => {
        const inputValue = option?.label ?? ''
        setState((x) => ({
          ...x,
          inputValue,
          open: false,
          selectedOption: option,
        }))
        onChange?.(inputValue)
      },
      [onChange],
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
          case 'End':
          case 'Home':
            event.preventDefault()
            event.stopPropagation()
            onArrowKeyEvent(event)
            break
          case 'Escape': {
            setState((x) => ({
              ...x,
              inputValue: (x.inputValue || x.selectedOption?.label) ?? '',
              open: false,
            }))
            inputRef.current?.blur()
            break
          }
          case 'Enter': {
            event.preventDefault()
            const index = state.highlightedIndex
            const item = index ? filteredOptions[index] : filteredOptions[0]
            handleSelect(item)
            inputRef.current?.blur()
            break
          }
          default:
            return
        }
      },
      [
        filteredOptions,
        inputRef,
        state.highlightedIndex,
        handleSelect,
        onArrowKeyEvent,
      ],
    )

    const handleHover = React.useCallback((index: number) => {
      setState((x) => ({ ...x, highlightedIndex: index }))
    }, [])

    // Whenever value changes, update internal state value
    React.useEffect(() => {
      setState((x) => ({ ...x, changed: true, inputValue: value ?? '' }))
    }, [value])

    // Close menu if click outside
    useWindowEvent('mousedown', (event) => {
      if (!open) return
      const target = event.target as HTMLElement
      if (rootRef.current?.contains(target)) return
      setState((x) => ({
        ...x,
        inputValue: (x.inputValue || x.selectedOption?.label) ?? '',
        open: false,
      }))
    })

    const suffix = (loading || state.selectedOption) && (
      <Stack direction="horizontal" space="2.5">
        {loading && <Spinner />}
        {state.selectedOption && (
          <Box
            as="button"
            color={{ base: 'textTertiary', hover: 'text' }}
            cursor="pointer"
            onClick={(event) => {
              event.preventDefault()
              setState((x) => ({
                ...x,
                inputValue: '',
                open: false,
                selectedOption: undefined,
              }))
            }}
          >
            <VisuallyHidden>Clear selected option</VisuallyHidden>
            <IconClose />
          </Box>
        )}
      </Stack>
    )

    return (
      <Box ref={rootRef}>
        <Box
          aria-expanded={state.open}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          className={[styles.combobox, state.open && styles.comboboxActive]}
          id={id}
          role="combobox"
        >
          <Input
            aria-activedescendant={
              state.highlightedIndex
                ? elementIdsRef.current.getItemId(state.highlightedIndex)
                : ''
            }
            aria-autocomplete="both"
            aria-controls={listboxId}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            disabled={disabled}
            hideLabel={hideLabel}
            label={label}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            suffix={suffix}
            tabIndex={tabIndex}
            textTransform={textTransform}
            value={state.inputValue ?? ''}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </Box>

        {state.open ? (
          <Box className={styles.listbox}>
            {filteredOptions.length ? (
              <Box as="ul" id={listboxId} ref={menuRef} role="listbox">
                {filteredOptions.map((x, i) => (
                  <Option
                    highlighted={i === state.highlightedIndex}
                    id={elementIdsRef.current.getItemId(i)}
                    index={i}
                    key={x.value}
                    label={x.label}
                    option={x}
                    prefix={x.prefix}
                    ref={(node) => {
                      // Set ref when list item loads
                      if (!node) return
                      optionRefs.current[elementIdsRef.current.getItemId(i)] =
                        node
                    }}
                    selected={x.value === state.selectedOption?.value}
                    suffix={x.suffix}
                    onHover={handleHover}
                    onSelect={handleSelect}
                  />
                ))}
              </Box>
            ) : (
              <Box alignItems="center" display="flex" flexDirection="column">
                <Box
                  alignItems="center"
                  display="flex"
                  fontSize="base"
                  fontWeight="semiBold"
                  height="14"
                  textAlign="center"
                >
                  {emptyText}
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box as="ul" id={listboxId} ref={menuRef} role="listbox" />
        )}

        <VisuallyHidden>
          <Box aria-live="polite" role="status">
            {options.length} results available
          </Box>
        </VisuallyHidden>
      </Box>
    )
  },
)

type OptionProps = {
  highlighted?: boolean
  id: string
  index: number
  label: Option['label']
  option: Option
  prefix?: Option['prefix']
  selected?: boolean
  suffix?: Option['suffix']
  onSelect(option: Option): void
  onHover(index: number): void
}

const Option = React.forwardRef(
  (
    {
      highlighted,
      id,
      index,
      option,
      prefix,
      selected,
      suffix,
      label,
      onSelect,
      onHover,
    }: OptionProps,
    ref: React.Ref<HTMLLIElement>,
  ) => {
    const onClick = React.useCallback(() => {
      onSelect(option)
    }, [option, onSelect])

    const onMouseMove = React.useCallback(() => {
      onHover(index)
    }, [index, onHover])

    const isEven = index % 2 === 0
    let backgroundColor: BoxProps['backgroundColor']
    if (highlighted) backgroundColor = 'accentSecondary'
    else if (isEven) backgroundColor = 'foregroundTertiary'
    else backgroundColor = 'background'

    return (
      <Box
        alignItems="center"
        aria-selected={selected}
        as="li"
        backgroundColor={backgroundColor}
        cursor="pointer"
        data-highlighted={highlighted || undefined}
        display="flex"
        gap="2"
        id={id}
        justifyContent="space-between"
        minHeight="14"
        paddingX="4"
        ref={ref}
        role="option"
        onClick={onClick}
        onMouseMove={onMouseMove}
      >
        <Stack align="center" direction="horizontal" space="2.5">
          {prefix}
          <Box fontSize="base" fontWeight={selected ? 'bold' : 'semiBold'}>
            {label}
          </Box>
        </Stack>

        {(suffix || selected) && (
          <Stack align="center" direction="horizontal" space="2.5">
            {suffix && suffix}
            {selected && <IconCheck />}
          </Stack>
        )}
      </Box>
    )
  },
)
