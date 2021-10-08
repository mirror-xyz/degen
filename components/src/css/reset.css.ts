import { style } from '@vanilla-extract/css'

import 'focus-visible'
import { vars } from './vars.css'

/**
 * Selector for `focus-visible` package
 * https://github.com/WICG/focus-visible
 */
const hideFocusRingsDataAttribute =
  '[data-js-focus-visible] &:focus:not([data-focus-visible-added])'

export const base = style({
  margin: 0,
  padding: 0,
  borderColor: vars.colors.current,
  borderStyle: vars.borderStyles.solid,
  borderWidth: 0,
  boxSizing: 'border-box',
  color: vars.colors.current,
  fontSize: '100%',
  fontFamily: vars.fonts.sans,
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: vars.colors.transparent,
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
  lineHeight: vars.lineHeights.none,
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

const field = style([
  block,
  appearance,
  style({
    outline: 'none',
    '::placeholder': {
      color: vars.colors.textSecondary,
      opacity: 1,
    },
  }),
])

// Custom reset rules
const mark = style({
  backgroundColor: vars.colors.transparent,
  color: vars.colors.inherit,
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
      '&::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
      },
      '&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },
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
  color: vars.colors.inherit,
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
