import * as React from 'react'

import { Providers, actHook, cleanup, renderHook } from '@/test'

import { useTheme } from '../use-theme'

describe('useTheme', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toStrictEqual({
      accent: 'blue',
      setAccent: expect.any(Function),
      setTheme: expect.any(Function),
      theme: 'light',
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

  it('sets theme', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toStrictEqual('light')

    actHook(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toStrictEqual('dark')
  })

  it('sets defaults', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <Providers
          themeProps={{ defaultTheme: 'dark', defaultAccent: 'green' }}
        >
          {children}
        </Providers>
      ),
    })

    expect(result.current.theme).toStrictEqual('dark')
    expect(result.current.accent).toStrictEqual('green')
  })
})
