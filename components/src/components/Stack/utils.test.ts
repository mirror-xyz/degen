import { directionToFlexDirection, wrapToFlexWrap } from './utils'

describe.each`
  direction                               | expected
  ${'horizontal'}                         | ${'row'}
  ${'vertical'}                           | ${'column'}
  ${{ xs: 'horizontal' }}                 | ${{ xs: 'row' }}
  ${{ xs: 'horizontal', sm: 'vertical' }} | ${{ xs: 'row', sm: 'column' }}
  ${{ xs: 'vertical', sm: 'horizontal' }} | ${{ xs: 'column', sm: 'row' }}
  ${undefined}                            | ${undefined}
`('directionToFlexDirection($direction)', ({ direction, expected }) => {
  it(`returns ${JSON.stringify(expected)}`, () => {
    expect(directionToFlexDirection(direction)).toEqual(expected)
  })
})

describe.each`
  wrap                       | expected
  ${true}                    | ${'wrap'}
  ${false}                   | ${undefined}
  ${{ xs: false }}           | ${{ xs: 'nowrap' }}
  ${{ xs: true, sm: false }} | ${{ xs: 'wrap', sm: 'nowrap' }}
  ${{ xs: false, sm: true }} | ${{ xs: 'nowrap', sm: 'wrap' }}
  ${undefined}               | ${undefined}
`('wrapToFlexWrap($wrap)', ({ wrap, expected }) => {
  it(`returns ${JSON.stringify(expected)}`, () => {
    expect(wrapToFlexWrap(wrap)).toEqual(expected)
  })
})
