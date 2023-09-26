import { getCenterProps } from './utils'

describe.each`
  center       | size        | side       | expected
  ${true}      | ${'small'}  | ${'left'}  | ${{ position: 'absolute', left: '20px' }}
  ${true}      | ${'small'}  | ${'right'} | ${{ position: 'absolute', right: '20px' }}
  ${true}      | ${'medium'} | ${'right'} | ${{ position: 'absolute', right: '20px' }}
  ${true}      | ${'large'}  | ${'right'} | ${{ position: 'absolute', right: '16px' }}
  ${undefined} | ${'small'}  | ${'left'}  | ${{}}
`(
  'getCenterProps($center, $size, $side)',
  ({ center, size, side, expected }) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      expect(getCenterProps(center, size, side)).toEqual(expected)
    })
  },
)
