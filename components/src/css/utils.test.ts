import { tokens } from '../tokens'
import {
  getAccentText,
  getModeColors,
  getVarName,
  motionSafe,
  rgb,
} from './utils'

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

describe.each`
  value     | path                        | expected
  ${0}      | ${['space', 0]}             | ${'space-0'}
  ${1.5}    | ${['space', 1.5]}           | ${'space-1_5'}
  ${'px'}   | ${['space', 'px']}          | ${'space-px'}
  ${'none'} | ${['borderStyles', 'none']} | ${'borderStyles-none'}
`('getVarName($value, $path)', ({ value, path, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getVarName(value, path)).toStrictEqual(expected)
  })
})

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
  style | expected
  ${{
  transition: 'color 2s',
}} | ${{
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'color 2s',
    },
  },
}}
`('motionSafe($style)', ({ style, expected }) => {
  it(`returns ${expected}`, () => {
    expect(motionSafe(style)).toEqual(expected)
  })
})
