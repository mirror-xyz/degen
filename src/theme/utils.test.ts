import { tokens } from '~/tokens'
import { getAccentText, getModeColors, rgb } from './utils'

describe.each`
  partial            | alpha        | expected
  ${'255, 255, 255'} | ${undefined} | ${'rgb(255, 255, 255)'}
  ${'255, 255, 255'} | ${'0.5'}     | ${'rgba(255, 255, 255, 0.5)'}
`('rgb($partial, $alpha)', ({ partial, alpha, expected }) => {
  it(`returns ${expected}`, () => {
    expect(rgb(partial, alpha)).toEqual(expected)
  })
})

describe.each`
  mode       | accent          | expected
  ${'light'} | ${'blue'}       | ${tokens.colors.dark.foreground}
  ${'dark'}  | ${'blue'}       | ${tokens.colors.dark.foreground}
  ${'light'} | ${'foreground'} | ${tokens.colors.dark.foreground}
  ${'dark'}  | ${'foreground'} | ${tokens.colors.light.foreground}
  ${'dark'}  | ${'yellow'}     | ${tokens.colors.light.foreground}
`('getAccentText($mode, $accent)', ({ mode, accent, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getAccentText(mode, accent)).toEqual(expected)
  })
})

describe.each`
  mode       | expected
  ${'light'} | ${tokens.colors['light']}
  ${'dark'}  | ${tokens.colors['dark']}
`('getModeColors($mode)', ({ mode, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getModeColors(mode)).toStrictEqual(expected)
  })
})
