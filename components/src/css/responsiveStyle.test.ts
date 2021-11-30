import { responsiveStyle } from './responsiveStyle'

const xs = {
  actual: {
    xs: {
      backgroundColor: 'red',
    },
  },
  expected: {
    backgroundColor: 'red',
  },
}

const xsMd = {
  actual: {
    xs: {
      backgroundColor: 'red',
    },
    md: {
      backgroundColor: 'blue',
    },
  },
  expected: {
    backgroundColor: 'red',
    '@media': {
      'screen and (min-width: 768px)': {
        backgroundColor: 'blue',
      },
    },
  },
}

const xsMdLg = {
  actual: {
    xs: {
      backgroundColor: 'red',
    },
    md: {
      backgroundColor: 'blue',
      position: 'relative',
    },
    lg: {
      backgroundColor: 'green',
    },
  },
  expected: {
    backgroundColor: 'red',
    '@media': {
      'screen and (min-width: 768px)': {
        backgroundColor: 'blue',
        position: 'relative',
      },
      'screen and (min-width: 1024px)': {
        backgroundColor: 'green',
      },
    },
  },
}

const lg = {
  actual: {
    lg: {
      backgroundColor: 'green',
    },
  },
  expected: {
    '@media': {
      'screen and (min-width: 1024px)': {
        backgroundColor: 'green',
      },
    },
  },
}

describe.each`
  style            | expected
  ${xs.actual}     | ${xs.expected}
  ${xsMd.actual}   | ${xsMd.expected}
  ${xsMdLg.actual} | ${xsMdLg.expected}
  ${lg.actual}     | ${lg.expected}
`('responsiveStyle($style)', ({ style, expected }) => {
  it(`returns ${expected}`, () => {
    expect(responsiveStyle(style)).toEqual(expected)
  })
})
