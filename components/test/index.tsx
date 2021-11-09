import * as React from 'react'
import { RenderResult, render as defaultRender } from '@testing-library/react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'

import {
  ThemeProvider,
  ThemeProviderProps,
} from '../src/components/ThemeProvider'

import '@testing-library/jest-dom/extend-expect'
import './mocks/URL.js'

type ProvidersProps = {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
  themeProps?: ThemeProviderProps
}
export const Providers = ({ children, themeProps }: ProvidersProps) => {
  return <ThemeProvider {...themeProps}>{children}</ThemeProvider>
}

// --------------------------------------------------
// Override default test render with our own
// --------------------------------------------------
type DefaultParams = Parameters<typeof defaultRender>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1]

const render = (
  ui: RenderUI,
  { wrapper, ...options }: RenderOptions = {},
): RenderResult => {
  if (!wrapper) wrapper = Providers as any
  return defaultRender(ui, { wrapper, ...options })
}

// --------------------------------------------------
// Override default test renderHook with our own
// --------------------------------------------------
export const renderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  { wrapper, ...options }: RenderHookOptions<TProps> | undefined = {},
) => {
  if (!wrapper) wrapper = Providers as WrapperComponent<TProps>
  return defaultRenderHook<TProps, TResult>(hook, { wrapper, ...options })
}

// --------------------------------------------------
// re-export everything
// --------------------------------------------------
/* eslint-disable import/export */
export * from '@testing-library/react'
/* eslint-enable import/export */
export { default as userEvent } from '@testing-library/user-event'
export { act as actHook } from '@testing-library/react-hooks'

// override methods
/* eslint-disable import/export */
export { render }
/* eslint-enable import/export */
