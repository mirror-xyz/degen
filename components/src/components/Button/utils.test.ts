import { getCenterProps } from './utils'

describe.each`
  center       | size    | side       | expected
  ${true}      | ${'lg'} | ${'left'}  | ${{ position: 'absolute', left: 5 }}
  ${true}      | ${'lg'} | ${'right'} | ${{ position: 'absolute', right: 5 }}
  ${true}      | ${'md'} | ${'right'} | ${{ position: 'absolute', right: 4 }}
  ${undefined} | ${'lg'} | ${'left'}  | ${{}}
`(
  'getCenterProps($center, $size, $side)',
  ({ center, size, side, expected }) => {
    it(`returns ${JSON.stringify(expected)}`, () => {
      expect(getCenterProps(center, size, side)).toEqual(expected)
    })
  },
)
