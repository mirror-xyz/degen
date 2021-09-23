import { isOfType } from './isOfType'

type PropsWithFunded = { funded: true }
type PropsWithLoading = { loading: true }
type PropsWithValue = { loading: true; value: number }
type Props = PropsWithFunded | PropsWithLoading | PropsWithValue

describe('isOfType', () => {
  it('returns true', () => {
    expect(isOfType<PropsWithFunded>({ funded: true }, 'funded')).toBe(true)
    expect(isOfType<PropsWithLoading>({ loading: true }, 'loading')).toBe(true)
    expect(isOfType<PropsWithValue>({ value: 10 }, 'value')).toBe(true)
  })

  it('returns false', () => {
    expect(isOfType<PropsWithFunded>({ loading: true }, 'funded')).toBe(false)
    expect(isOfType<PropsWithLoading>({ funded: true }, 'loading')).toBe(false)
    expect(isOfType<PropsWithValue>({ funded: true }, 'value')).toBe(false)
  })

  it('should fail type check', () => {
    // @ts-expect-error property does not exist in type
    expect(isOfType<PropsWithFunded>({ funded: true }, 'loading')).toBe(false)
    // @ts-expect-error property does not exist in type
    expect(isOfType<PropsWithLoading>({ loading: true }, 'funded')).toBe(false)
    // @ts-expect-error property does not exist in type
    expect(isOfType<Props>({ funded: true }, 'funded')).toBe(true)
  })
})
