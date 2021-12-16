import * as React from 'react'
import * as ReactDOM from 'react-dom'
import computeScrollIntoView from 'compute-scroll-into-view'
import { usePopper } from 'react-popper'

import { useId, useWindowEvent } from '../../hooks'
import { Box, BoxProps } from '../Box'
import { Button } from '../Button'
import { VisuallyHidden } from '../VisuallyHidden'
import { Stack } from '../Stack'
import { IconCheck, IconClose } from '../icons'
import { getNextWrappingIndex } from './utils'
import * as styles from './styles.css'

export type Option = {
  label: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value: number | string
}

type NativeInputProps = React.AllHTMLAttributes<HTMLInputElement>

type BaseProps = {
  autoFocus?: NativeInputProps['autoFocus']
  disabled?: boolean
  emptyText?: string
  filter?: (options: Option[], inputValue: string) => Option[]
  id?: NativeInputProps['id']
  label: string
  name?: string
  options?: Option[]
  placeholder?: NativeInputProps['placeholder']
  readOnly?: NativeInputProps['readOnly']
  tabIndex?: NativeInputProps['tabIndex']
  textTransform?: BoxProps['textTransform']
  value: number | string | undefined
  width?: BoxProps['width']
  onBlur?: NativeInputProps['onBlur']
  onChange(value?: Option['value']): void
  onFocus?: NativeInputProps['onFocus']
}

type CreateProps = {
  createText(inputValue: string): string
  onCreate(inputValue: string): void
}

type NoCreateProps = {
  createText?: never
  onCreate?: never
}

type Props = BaseProps & (CreateProps | NoCreateProps)

export const Combobox = React.forwardRef(
  (
    {
      autoFocus,
      createText,
      disabled,
      emptyText = 'No results',
      filter,
      id: contentId,
      label,
      name,
      options = [],
      placeholder,
      readOnly,
      tabIndex,
      textTransform,
      value,
      width,
      onChange,
      onCreate,
      onBlur,
      onFocus,
    }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const rootRef = React.useRef<HTMLElement>(null)

    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const optionRefs = React.useRef<Record<string, HTMLElement>>({})
    const listboxRef = React.useRef<HTMLElement>(null)
    const menuRef = React.useRef<HTMLElement>(null)

    const { styles: popperStyles, attributes } = usePopper(
      inputRef.current,
      listboxRef.current,
      {
        modifiers: [
          {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`
            },
            effect: ({ state }) => {
              state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
            },
          },
        ],
      },
    )

    const [state, setState] = React.useState<{
      changed?: boolean
      highlightedIndex?: number
      inputValue: string
      open: boolean
      selectedOption?: Option
    }>(() => {
      const initialOption = options.find((x) => x.value === value || x.value)
      const selectedOption = options.find(
        (x) => x.value === initialOption?.value,
      )
      return {
        changed: false,
        inputValue: initialOption?.label ?? '',
        open: false,
        selectedOption,
      }
    })

    const _id = useId()
    const id = `${_id}${contentId ? `-${contentId}` : ''}`
    const listboxId = `${id}-listbox`
    const elementIdsRef = React.useRef({
      getItemId: (id: string, index: number) => `${id}-option-${index}`,
    })

    // Whenever internal value changes, filter options
    const filteredOptions = React.useMemo(() => {
      // If there is a selected option, add to start of list on initial open
      if (
        state.selectedOption &&
        state.inputValue === state.selectedOption?.label &&
        !state.changed
      ) {
        return [
          state.selectedOption,
          ...options.filter((x) => x.value !== state.selectedOption?.value),
        ]
      }
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
        setState((x) => ({
          ...x,
          changed: false,
          highlightedIndex: undefined,
          open: true,
        }))
        onFocus?.(event)
      },
      [onFocus],
    )

    const scrollIntoView = React.useCallback(
      (index) => {
        const node =
          optionRefs.current[elementIdsRef.current.getItemId(id, index)]
        const actions = computeScrollIntoView(node, {
          block: 'nearest',
          scrollMode: 'if-needed',
        })
        actions.forEach(({ el, top }) => (el.scrollTop = top))
      },
      [elementIdsRef, id],
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
        onChange?.(option?.value)
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
      const selectedOption = options.find((x) => x.value === value)
      setState((x) => ({
        ...x,
        changed: true,
        inputValue: selectedOption?.label ?? '',
        selectedOption,
      }))
    }, [options, value])

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

    return (
      <Box position="relative" ref={rootRef} width={width}>
        <Box
          aria-expanded={state.open}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          className={styles.combobox({ active: state.open })}
          id={id}
          role="combobox"
        >
          <Box
            aria-activedescendant={
              state.highlightedIndex
                ? elementIdsRef.current.getItemId(id, state.highlightedIndex)
                : ''
            }
            aria-autocomplete="both"
            aria-controls={listboxId}
            aria-label={label}
            as="input"
            autoCorrect="off"
            autoFocus={autoFocus}
            className={styles.textbox({
              disabled,
              suffix: !!state.selectedOption,
            })}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            spellCheck="false"
            tabIndex={tabIndex}
            textTransform={textTransform}
            type="text"
            value={state.inputValue}
            width="full"
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />

          {state.selectedOption && (
            <Box
              alignItems="center"
              display="flex"
              height="full"
              paddingLeft="2"
              paddingRight="4"
            >
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
                  onChange?.('')
                }}
              >
                <VisuallyHidden>Clear selected option</VisuallyHidden>
                <IconClose />
              </Box>
            </Box>
          )}
        </Box>

        {state.open ? (
          ReactDOM.createPortal(
            <Box
              className={styles.listbox}
              ref={listboxRef}
              style={popperStyles.popper}
              {...attributes.popper}
            >
              {createText && onCreate && (
                <Box padding="4">
                  <Button onClick={() => onCreate(state.inputValue)}>
                    {createText(state.inputValue)}
                  </Button>
                </Box>
              )}

              {filteredOptions.length ? (
                <Box as="ul" id={listboxId} ref={menuRef} role="listbox">
                  {filteredOptions.map((x, i) => (
                    <Option
                      highlighted={i === state.highlightedIndex}
                      id={elementIdsRef.current.getItemId(id, i)}
                      index={i}
                      key={x.value}
                      label={x.label}
                      option={x}
                      prefix={x.prefix}
                      ref={(node) => {
                        // Set ref when list item loads
                        if (!node) return
                        optionRefs.current[
                          elementIdsRef.current.getItemId(id, i)
                        ] = node
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
            </Box>,
            document.body,
          )
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
