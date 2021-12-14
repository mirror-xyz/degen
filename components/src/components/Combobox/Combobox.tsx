import * as React from 'react'
import computeScrollIntoView from 'compute-scroll-into-view'

import { useId } from '../../hooks'
import { Box } from '../Box'
import { Input, InputProps } from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'
import * as styles from './styles.css'
import { Stack } from '../Stack'
import { Button } from '../Button'
import { getNextWrappingIndex } from './utils'
import { Spinner } from '../Spinner'

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
  createButtonText?(value: string): string
  defaultValue?: string
  emptyText?: string
  loading?: boolean
  options?: Option[]
  filter?: (option: Option, inputValue: string) => boolean
  value?: string
  onChange?(value: string, create?: boolean): void
}

export const Combobox = React.forwardRef(
  (
    {
      autoFocus,
      createButtonText,
      defaultValue,
      disabled,
      emptyText = 'No results',
      filter = (option, inputValue) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
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
    const defaultRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef
    const optionRefs = React.useRef<Record<string, HTMLElement>>({})
    const menuRef = React.useRef<HTMLElement>(null)

    const [state, setState] = React.useState<{
      highlightedIndex?: number
      open: boolean
      value: string
    }>(() => ({ open: false, value: value ?? defaultValue ?? '' }))

    const _id = useId()
    const id = `${_id}${contentId ? `-${contentId}` : ''}`
    const listboxId = `${id}-listbox`
    const elementIdsRef = React.useRef({
      getItemId: (index: number) => `${id}-option-${index}`,
    })

    const hasCreate = createButtonText && !!state.value.length
    // Whenever internal value changes, filter options
    const filteredOptions = React.useMemo(() => {
      const _options =
        state.value === ''
          ? options
          : options.filter((x) => filter(x, state.value))
      return [
        ...(hasCreate
          ? [{ value: 'create', label: createButtonText(state.value) }]
          : []),
        ..._options,
      ]
    }, [createButtonText, filter, hasCreate, options, state.value])
    const filteredOptionsLength = filteredOptions.length

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, open: false }))
        onBlur && onBlur(event)
      },
      [onBlur],
    )

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, value: event.target.value }))
      },
      [],
    )

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setState((x) => ({ ...x, open: true }))
        onFocus && onFocus(event)
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
      (value: string | number, create?: boolean) => {
        console.log(value, create)
      },
      [],
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
            setState((x) => ({ ...x, open: false }))
            inputRef.current?.blur()
            break
          }
          case 'Enter': {
            event.preventDefault()
            const index = state.highlightedIndex
            const item = index ? filteredOptions[index] : filteredOptions[0]
            if (!item) return
            const isCreate = item.value === 'create'
            handleSelect(isCreate ? state.value : item.value, isCreate)
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
        state.value,
        handleSelect,
        onArrowKeyEvent,
      ],
    )

    const handleHover = React.useCallback((index: number) => {
      setState((x) => ({ ...x, highlightedIndex: index }))
    }, [])

    // Whenever value changes, update internal state value
    React.useEffect(() => {
      setState((x) => ({ ...x, value: value ?? '' }))
    }, [value])

    return (
      <Box>
        <Box
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-owns={listboxId}
          className={[styles.combobox, state.open && styles.comboboxActive]}
          id={id}
          role="combobox"
        >
          <Input
            aria-activedescendant="merp"
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
            suffix={loading ? <Spinner /> : undefined}
            tabIndex={tabIndex}
            textTransform={textTransform}
            value={state.value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
        </Box>

        {state.open ? (
          <Box className={styles.listbox}>
            {filteredOptions.length ? (
              <Box as="ul" id={listboxId} ref={menuRef} role="listbox">
                {filteredOptions.map((x, i) =>
                  x.value === 'create' ? (
                    <Box
                      key={x.value}
                      padding="4"
                      ref={(node) => {
                        // Set ref when list item loads
                        if (!node) return
                        optionRefs.current[elementIdsRef.current.getItemId(i)] =
                          node
                      }}
                      onClick={() => handleSelect(state.value, true)}
                    >
                      <Button variant="secondary" width="full">
                        {x.label}
                      </Button>
                    </Box>
                  ) : (
                    <Option
                      hasCreate={hasCreate}
                      highlighted={i === state.highlightedIndex}
                      id={elementIdsRef.current.getItemId(i)}
                      index={i}
                      key={x.value}
                      label={x.label}
                      prefix={x.prefix}
                      ref={(node) => {
                        // Set ref when list item loads
                        if (!node) return
                        optionRefs.current[elementIdsRef.current.getItemId(i)] =
                          node
                      }}
                      selected={x.value === value}
                      suffix={x.suffix}
                      value={x.value}
                      onHover={handleHover}
                      onSelect={handleSelect}
                    />
                  ),
                )}
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
  hasCreate?: boolean
  highlighted?: boolean
  id: string
  index: number
  label: Option['label']
  prefix?: Option['prefix']
  selected?: boolean
  suffix?: Option['suffix']
  value: Option['value']
  onSelect(value: Option['value']): void
  onHover(index: number): void
}

const Option = React.forwardRef(
  (
    {
      hasCreate,
      highlighted,
      id,
      index,
      prefix,
      selected,
      suffix,
      value,
      label,
      onSelect,
      onHover,
    }: OptionProps,
    ref: React.Ref<HTMLLIElement>,
  ) => {
    const onClick = React.useCallback(() => {
      onSelect(value)
    }, [value, onSelect])

    const onMouseMove = React.useCallback(() => {
      onHover(index)
    }, [index, onHover])

    const isEven = index % 2 === 0

    return (
      <Box
        alignItems="center"
        aria-selected={selected}
        as="li"
        backgroundColor={
          highlighted
            ? 'accentSecondary'
            : (isEven && !hasCreate) || (!isEven && hasCreate)
            ? 'foregroundTertiary'
            : 'background'
        }
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
          <Box fontSize="base" fontWeight="semiBold">
            {label}
          </Box>
        </Stack>

        {suffix}
      </Box>
    )
  },
)

