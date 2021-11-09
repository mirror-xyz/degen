import { cleanup, renderHook } from '@/test'

import { useFieldIds } from './useFieldIds'

const noArgs = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': 'degen1-label',
    id: 'degen1',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: 'degen1',
    id: 'degen1-label',
  },
}

const withId = {
  content: {
    'aria-describedby': undefined,
    'aria-labelledby': 'degen2-address-label',
    id: 'degen2-address',
  },
  description: undefined,
  error: undefined,
  label: {
    htmlFor: 'degen2-address',
    id: 'degen2-address-label',
  },
}

const withDescription = {
  content: {
    'aria-describedby': 'degen3-description',
    'aria-labelledby': 'degen3-label',
    id: 'degen3',
  },
  description: {
    id: 'degen3-description',
  },
  error: undefined,
  label: {
    htmlFor: 'degen3',
    id: 'degen3-label',
  },
}

const withError = {
  content: {
    'aria-describedby': 'degen4-error',
    'aria-labelledby': 'degen4-label',
    id: 'degen4',
  },
  description: undefined,
  error: {
    id: 'degen4-error',
  },
  label: {
    htmlFor: 'degen4',
    id: 'degen4-label',
  },
}

const withDescriptionAndError = {
  content: {
    'aria-describedby': 'degen5-description degen5-error',
    'aria-labelledby': 'degen5-label',
    id: 'degen5',
  },
  description: {
    id: 'degen5-description',
  },
  error: {
    id: 'degen5-error',
  },
  label: {
    htmlFor: 'degen5',
    id: 'degen5-label',
  },
}

describe.each`
  args                                  | expected
  ${undefined}                          | ${noArgs}
  ${{ id: 'address' }}                  | ${withId}
  ${{ description: true }}              | ${withDescription}
  ${{ error: true }}                    | ${withError}
  ${{ description: true, error: true }} | ${withDescriptionAndError}
`('useFieldIds($args)', ({ args, expected }) => {
  afterEach(cleanup)

  it(`returns ${JSON.stringify(expected)}`, () => {
    const { result } = renderHook(() => useFieldIds(args))
    expect(result.current).toStrictEqual(expected)
  })
})
