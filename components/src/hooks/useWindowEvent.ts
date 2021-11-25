import * as React from 'react'

export const useWindowEvent = <Type extends keyof WindowEventMap>(
  type: Type,
  listener: (this: Window, ev: WindowEventMap[Type]) => any,
  options?: boolean | AddEventListenerOptions,
) => {
  const listenerRef = React.useRef(listener)
  listenerRef.current = listener

  React.useEffect(() => {
    const handler = (event: WindowEventMap[Type]) => {
      listenerRef.current.call(window, event)
    }

    window.addEventListener(type, handler, options)
    return () => window.removeEventListener(type, handler, options)
  }, [type, options])
}
