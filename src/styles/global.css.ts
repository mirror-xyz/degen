import { globalStyle } from '@vanilla-extract/css'

import { vars } from './theme.css'

globalStyle('html', {
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  fontFamily: vars.fontFamily.sans,
  fontSize: vars.fontSize.root,
  textRendering: 'optimizeLegibility',
})

/**
 * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
 * A thin layer on top of normalize.css that provides a starting point more
 * suitable for web applications.
 */

/**
 * Removes the default spacing and border for appropriate elements.
 */

globalStyle('blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre', {
  margin: 0,
})

globalStyle('button', {
  backgroundColor: 'transparent',
  backgroundImage: 'none',
})

globalStyle('fieldset', {
  margin: 0,
  padding: 0,
})

globalStyle('ol, ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

/**
 * Tailwind custom reset styles
 * https://github.com/tailwindlabs/tailwindcss/blob/master/src/plugins/css/preflight.css
 */

/**
 * 1. Use Tailwind's default "normal" line-height so the user isn't forced
 *    to override it to ensure consistency even when using the default theme.
 */

globalStyle('html', {
  lineHeight: 1.5 /* 2 */,
})

/**
 * Inherit font-family and line-height from `html` so users can set them as
 * a class directly on the `html` element.
 */

globalStyle('body', {
  fontFamily: 'inherit',
  lineHeight: 'inherit',
})

/**
 * 1. Prevent padding and border from affecting element width.
 *
 *    We used to set this in the html element and inherit from
 *    the parent element for everything else. This caused issues
 *    in shadow-dom-enhanced elements like <details> where the content
 *    is wrapped by a div with box-sizing set to `content-box`.
 *
 *    https://github.com/mozdevs/cssremedy/issues/4
 *
 *
 * 2. Allow adding a border to an element by just adding a border-width.
 *
 *    By default, the way the browser specifies that an element should have no
 *    border is by setting it's border-style to `none` in the user-agent
 *    stylesheet.
 *
 *    In order to easily add borders to elements by just setting the `border-width`
 *    property, we change the default border-style for all elements to `solid`, and
 *    use border-width to hide them instead. This way our `border` utilities only
 *    need to set the `border-width` property instead of the entire `border`
 *    shorthand, making our border utilities much more straightforward to compose.
 *
 *    https://github.com/tailwindcss/tailwindcss/pull/116
 */

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box' /* 1 */,
  borderWidth: 0 /* 2 */,
  borderStyle: 'solid' /* 2 */,
  borderColor: 'currentColor' /* 2 */,
})

/*
 * Ensure horizontal rules are visible by default
 */

globalStyle('hr', {
  borderTopWidth: '1px',
})

/**
 * Undo the `border-style: none` reset that Normalize applies to images so that
 * our `border-{width}` utilities have the expected effect.
 *
 * The Normalize reset is unnecessary for us since we default the border-width
 * to 0 on all elements.
 *
 * https://github.com/tailwindcss/tailwindcss/issues/362
 */

globalStyle('img', {
  borderStyle: 'solid',
})

globalStyle('textarea', {
  resize: 'vertical',
})

globalStyle('button, [role="button"]', {
  cursor: 'pointer',
})

globalStyle('table', {
  borderCollapse: 'collapse',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
})

/**
 * Reset links to optimize for opt-in styling instead of
 * opt-out.
 */

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
})

/**
 * Reset form element properties that are easy to forget to
 * style explicitly so you don't inadvertently introduce
 * styles that deviate from your design system. These styles
 * supplement a partial reset that is already applied by
 * normalize.css.
 */

globalStyle('button, input, optgroup, select, textarea', {
  padding: 0,
  lineHeight: 'inherit',
  color: 'inherit',
})

/**
 * 1. Make replaced elements `display: block` by default as that's
 *    the behavior you want almost all of the time. Inspired by
 *    CSS Remedy, with `svg` added as well.
 *
 *    https://github.com/mozdevs/cssremedy/issues/14
 *
 * 2. Add `vertical-align: middle` to align replaced elements more
 *    sensibly by default when overriding `display` by adding a
 *    utility like `inline`.
 *
 *    This can trigger a poorly considered linting error in some
 *    tools but is included by design.
 *
 *    https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210
 */

globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block' /* 1 */,
  verticalAlign: 'middle' /* 2 */,
})

/**
 * Constrain images and videos to the parent width and preserve
 * their intrinsic aspect ratio.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

globalStyle('img, video', {
  maxWidth: '100%',
  height: 'auto',
})

/**
 * Ensure the default browser behavior of the `hidden` attribute.
 */

globalStyle('[hidden]', {
  display: 'none',
})
