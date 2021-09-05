import * as React from 'react'
import { RenderResult, render as defaultRender } from '@testing-library/react'
import {
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'

import { ThemeProvider } from '~/components'

import '@testing-library/jest-dom/extend-expect'
import './__mocks__/match-media'

const Providers = ({
  children,
}: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> &
    React.ReactNode
}) => {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
}

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1]

const render = (
  ui: RenderUI,
  { wrapper, ...options }: RenderOptions = {},
): RenderResult => {
  if (!wrapper) wrapper = Providers as React.ComponentType
  return defaultRender(ui, { wrapper, ...options })
}

// --------------------------------------------------
// Override the default test renderHook with our own
//
// You can override the router mock like this:
//
// const result = renderHook(() => myHook(), {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultHookParams = Parameters<typeof defaultRenderHook>
type RenderHook = DefaultHookParams[0]
type RenderHookOptions = DefaultHookParams[1]

export const renderHook = (
  hook: RenderHook,
  { wrapper, ...options }: RenderHookOptions = {},
) => {
  if (!wrapper) wrapper = Providers as WrapperComponent<unknown>
  return defaultRenderHook(hook, { wrapper, ...options })
}

// re-export everything
/* eslint-disable import/export */
export * from '@testing-library/react'
/* eslint-enable import/export */
export { default as userEvent } from '@testing-library/user-event'
export { act as actHook } from '@testing-library/react-hooks'

// override methods
/* eslint-disable import/export */
export { render }
/* eslint-enable import/export */
