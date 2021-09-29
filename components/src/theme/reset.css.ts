import { style } from '@vanilla-extract/css'

import 'focus-visible'

/**
 * Selector for `focus-visible` package
 * https://github.com/WICG/focus-visible
 */
const hideFocusRingsDataAttribute =
  '[data-js-focus-visible] &:focus:not([data-focus-visible-added])'

export const base = style({
  margin: 0,
  padding: 0,
  borderColor: 'currentColor',
  borderStyle: 'solid',
  borderWidth: 0,
  boxSizing: 'border-box',
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
  selectors: {
    [`${hideFocusRingsDataAttribute}`]: {
      outline: 'none',
    },
  },
})

// HTML5 display-role reset for older browsers
const block = style({
  display: 'block',
})

const body = style({
  lineHeight: 1,
})

const list = style({
  listStyle: 'none',
})

const quote = style({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
})

const table = style({
  borderCollapse: 'collapse',
  borderSpacing: 0,
})

const appearance = style({
  appearance: 'none',
})

const field = style([block, appearance])

// Custom reset rules
const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit',
})

const select = style([
  field,
  style({
    selectors: {
      '&::-ms-expand': {
        display: 'none',
      },
    },
  }),
])

const input = style([
  field,
  style({
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  }),
])

const button = style({
  background: 'none',
})

const a = style({
  textDecoration: 'none',
  color: 'inherit',
})

export const element = {
  article: block,
  aside: block,
  details: block,
  div: block,
  figcaption: block,
  figure: block,
  footer: block,
  header: block,
  hgroup: block,
  menu: block,
  nav: block,
  section: block,
  ul: list,
  ol: list,
  blockquote: quote,
  q: quote,
  body,
  a,
  table,
  mark,
  select,
  button,
  textarea: field,
  input,
}
