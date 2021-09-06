import { cleanup, renderHook } from '@/test'

import { useBoxProps } from '../use-box-props'

describe('useBoxProps', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { result } = renderHook(() =>
      useBoxProps({
        color: 'accent',
        fontSize: undefined,
        mx: { sm: 4, lg: 8 },
      }),
    )

    expect(result.current).toEqual({
      color: 'accent',
      mx: { sm: 4, lg: 8 },
    })
  })
})
