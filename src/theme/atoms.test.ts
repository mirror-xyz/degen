import { atoms } from './atoms'

describe.each`
  reset         | expected
  ${'div'}      | ${'reset__'}
  ${'article'}  | ${'reset__'}
  ${'button'}   | ${'reset__'}
  ${'textarea'} | ${'reset__'}
`('atoms({ reset: $reset })', ({ reset, expected }) => {
  it(`returns ${expected}`, () => {
    const classNames = atoms({ reset })
    expect(classNames).toContain(expected)
  })
})
