import { getNextWrappingIndex } from './utils'

describe.each`
  moveAmount | baseIndex | itemCount | circular | expected
  ${1}       | ${0}      | ${5}      | ${false} | ${1}
  ${1}       | ${1}      | ${5}      | ${false} | ${2}
  ${1}       | ${4}      | ${5}      | ${false} | ${4}
  ${1}       | ${4}      | ${5}      | ${true}  | ${0}
  ${-1}      | ${1}      | ${5}      | ${false} | ${0}
  ${-1}      | ${0}      | ${5}      | ${false} | ${0}
  ${-1}      | ${0}      | ${5}      | ${true}  | ${4}
  ${6}       | ${0}      | ${5}      | ${false} | ${4}
  ${6}       | ${0}      | ${5}      | ${true}  | ${0}
`(
  'getNextWrappingIndex($moveAmount, $baseIndex, $itemCount, $circular)',
  ({ moveAmount, baseIndex, itemCount, circular, expected }) => {
    it(`returns ${expected}`, () => {
      expect(
        getNextWrappingIndex(moveAmount, baseIndex, itemCount, circular),
      ).toEqual(expected)
    })
  },
)
