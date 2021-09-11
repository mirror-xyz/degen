import * as React from 'react'
import { RenderResult, render as defaultRender } from '@testing-library/react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import { axe, toHaveNoViolations } from 'jest-axe'
import { RunOptions } from 'axe-core'

import { ThemeProvider, ThemeProviderProps } from '~/theme'

import '@testing-library/jest-dom/extend-expect'
import './__mocks__/match-media'

type ProvidersProps = {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
  themeProps?: Partial<Omit<ThemeProviderProps, 'children'>>
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
  if (!wrapper) wrapper = Providers as React.ComponentType
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
// Basic checker for a11y violations
// --------------------------------------------------
expect.extend(toHaveNoViolations)

type TestA11YOptions = RenderOptions & { axeOptions?: RunOptions }
export const testA11y = async (
  ui: React.ReactElement,
  { axeOptions, ...options }: TestA11YOptions = {},
) => {
  const container = React.isValidElement(ui)
    ? render(ui, options).container
    : ui
  const results = await axe(container, axeOptions)
  expect(results).toHaveNoViolations()
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
