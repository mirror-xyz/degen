import { getCenterProps } from './utils'

describe.each`
  center       | side       | expected
  ${true}      | ${'left'}  | ${{ position: 'absolute', left: 4 }}
  ${true}      | ${'right'} | ${{ position: 'absolute', right: 4 }}
  ${undefined} | ${'left'}  | ${{}}
`('getCenterProps($center, $side)', ({ center, side, expected }) => {
  it(`returns ${JSON.stringify(expected)}`, () => {
    expect(getCenterProps(center, side)).toEqual(expected)
  })
})
