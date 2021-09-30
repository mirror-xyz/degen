import * as React from 'react'
import curry from 'lodash/curry'

export type StateProp = {
  stateName?: string
}

type Store = Map<string, any>

const unwrapValue = (value: any) => {
  let actualValue = value

  if (typeof value === 'object' && value !== null && 'currentTarget' in value) {
    const { currentTarget } = value

    actualValue =
      currentTarget.type === 'checkbox'
        ? currentTarget.checked
        : currentTarget.value
  }
  return actualValue
}

const makeStoreConsumer = (
  defaultState: Map<string, any>,
  store: Store,
  setStore: (newStore: Store) => void,
) => {
  const setDefaultState = (key: string, value: any) =>
    defaultState.set(key, value)

  const getState = (key: string) => store.get(key) ?? defaultState.get(key)

  const setState = curry((key: string, value: any) =>
    setStore(new Map(store.set(key, unwrapValue(value)))),
  )

  const toggleState = (key: string) => setState(key, !getState(key))

  const resetState = (...keys: string[]) => {
    if (keys.length) {
      keys.forEach((key) => {
        store.delete(key)
      })
      setStore(new Map(store))
    } else {
      setStore(new Map())
    }
  }

  return {
    setDefaultState,
    getState,
    setState,
    toggleState,
    resetState,
  }
}

const PlayroomStateContext = React.createContext<ReturnType<
  typeof makeStoreConsumer
> | null>(null)

type Props = {
  defaultState?: Map<string, any>
}

export const PlayroomStateProvider = ({
  defaultState: defaultStateProp,
  children,
}: React.PropsWithChildren<Props>) => {
  const [fallbackDefaultState] = React.useState(() => new Map())
  const defaultState = defaultStateProp ?? fallbackDefaultState
  const state = React.useState(new Map<string, any>())
  const storeConsumer = React.useMemo(
    () => makeStoreConsumer(defaultState, ...state),
    [state, defaultState],
  )

  return (
    <PlayroomStateContext.Provider value={storeConsumer}>
      {children}
    </PlayroomStateContext.Provider>
  )
}

export const usePlayroomStore = () => {
  const storeConsumer = React.useContext(PlayroomStateContext)
  if (!storeConsumer) throw new Error('Must be within PlayroomStateProvider')
  return storeConsumer
}

type Callback = (...args: any[]) => void

/* eslint-disable @typescript-eslint/no-empty-function */
const noop = () => {}
/* eslint-enable @typescript-eslint/no-empty-function */

export const useFallbackState = <Value, Handler extends Callback>(
  stateKey: string | undefined,
  value: Value,
  onChange: Handler | undefined,
  defaultValue?: Value,
): [NonNullable<Value>, (...args: Parameters<Handler>) => void] => {
  const playroomState = usePlayroomStore()
  const [internalStateValue, setInternalStateValue] =
    React.useState(defaultValue)

  const wrapChangeHandler =
    (
      handler: Handler | typeof noop,
    ): ((...args: Parameters<Handler>) => void) =>
    (...args) => {
      if (value === undefined) {
        ;(stateKey ? playroomState.setState(stateKey) : setInternalStateValue)(
          unwrapValue(args[0]),
        )
      }

      ;(handler || noop)(...args)
    }

  const handleChange = wrapChangeHandler(onChange || noop)

  const resolvedValue =
    value ??
    (stateKey
      ? playroomState.getState(stateKey) ?? defaultValue
      : internalStateValue)

  return [resolvedValue, handleChange]
}
