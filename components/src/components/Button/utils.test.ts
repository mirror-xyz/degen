import { getCenterProps } from './utils'

describe.each`
  center       | size        | side       | expected
  ${true}      | ${'small'}  | ${'left'}  | ${{ position: 'absolute', left: 5 }}
  ${true}      | ${'small'}  | ${'right'} | ${{ position: 'absolute', right: 5 }}
  ${true}      | ${'medium'} | ${'right'} | ${{ position: 'absolute', right: 5 }}
  ${true}      | ${'large'}  | ${'right'} | ${{ position: 'absolute', right: 4 }}
  ${undefined} | ${'small'}  | ${'left'}  | ${{}}
`(
  'getCenterProps($center, $size, $side)',
  ({ center, size, side, expected }) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      expect(getCenterProps(center, size, side)).toEqual(expected)
    })
  },
)
