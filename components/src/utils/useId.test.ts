import { cleanup, renderHook } from '@/test'

import { useId } from './useId'

describe('useId', () => {
  afterEach(cleanup)

  it('generates id', () => {
    const { result: resultA } = renderHook(() => useId())
    expect(resultA.current).toStrictEqual('degen1')
    const { result: resultB } = renderHook(() => useId())
    expect(resultB.current).toStrictEqual('degen2')
  })
})
