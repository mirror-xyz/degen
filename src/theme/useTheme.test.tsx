import * as React from 'react'

import { Providers, actHook, cleanup, renderHook } from '@/test'

import { useTheme } from './useTheme'

describe('useTheme', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current).toStrictEqual({
      accent: 'blue',
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

  it('sets theme', () => {
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
})
