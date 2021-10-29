import * as React from 'react'
import { render } from '@testing-library/react'

import { Providers, actHook, cleanup, renderHook, screen } from '@/test'

import { ThemeProvider, attribute, useTheme } from './ThemeProvider'

describe('<ThemeProvider />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<ThemeProvider>foo bar baz</ThemeProvider>)
    expect(screen.getByText(/foo/i)).toBeInTheDocument()
  })

  it('forcedMode', () => {
    render(<ThemeProvider forcedMode="dark">foo bar baz</ThemeProvider>)
    expect(
      document.querySelector(`[${attribute}]`)?.getAttribute(attribute),
    ).toStrictEqual('dark')
  })
})

describe('useTheme', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toStrictEqual({
      accent: 'blue',
      forcedAccent: undefined,
      forcedMode: undefined,
      mode: 'light',
      setAccent: expect.any(Function),
      setMode: expect.any(Function),
    })
  })

  it('sets accent', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.accent).toStrictEqual('blue')

    actHook(() => {
      result.current.setAccent('green')
    })

    expect(result.current.accent).toStrictEqual('green')
  })

  it('sets mode', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.mode).toStrictEqual('light')

    actHook(() => {
      result.current.setMode('dark')
    })

    expect(result.current.mode).toStrictEqual('dark')
  })

  it('sets defaults', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <Providers themeProps={{ defaultMode: 'dark', defaultAccent: 'green' }}>
          {children}
        </Providers>
      ),
    })

    expect(result.current.mode).toStrictEqual('dark')
    expect(result.current.accent).toStrictEqual('green')
  })

  it('forcedMode', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <Providers themeProps={{ defaultMode: 'dark', forcedMode: 'light' }}>
          {children}
        </Providers>
      ),
    })

    expect(result.current.forcedMode).toStrictEqual('light')
    expect(result.current.mode).toStrictEqual('dark')
  })

  it('forcedAccent', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <Providers
          themeProps={{ defaultAccent: 'blue', forcedAccent: 'indigo' }}
        >
          {children}
        </Providers>
      ),
    })

    expect(result.current.forcedAccent).toStrictEqual('indigo')
    expect(result.current.accent).toStrictEqual('blue')
  })
})
