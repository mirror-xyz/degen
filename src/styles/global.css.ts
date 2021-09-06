import { globalStyle } from '@vanilla-extract/css'

globalStyle('html', {
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
})

/**
 * Tailwind custom reset styles
 * https://github.com/tailwindlabs/tailwindcss/blob/master/src/plugins/css/preflight.css
 */

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
 * 2. Allow adding a border to an element by adding a border-color and border-width.
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
})

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
*/

globalStyle('html', {
  lineHeight: '1.5' /* 1 */,
  WebkitTextSizeAdjust: '100%' /* 2 */,
  MozTabSize: 4 /* 3 */,
  tabSize: 4 /* 3 */,
})

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

globalStyle('body', {
  margin: 0 /* 1 */,
  lineHeight: 'inherit' /* 2 */,
})

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

globalStyle('hr', {
  height: 0 /* 1 */,
  color: 'inherit' /* 2 */,
  borderTopWidth: '1px' /* 3 */,
})

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

globalStyle('abbr[title]', {
  textDecoration: 'underline dotted',
})

/*
Remove the default font size and weight for headings.
*/

globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
})

/**
 * Reset links to optimize for opt-in styling instead of opt-out.
 */

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
})

/*
Add the correct font weight in Edge and Safari.
*/

globalStyle('b, strong', {
  fontWeight: 'bolder',
})

/*
1. Use configured `mono` font family by default.
2. Correct the odd `em` font sizing in all browsers.
*/

globalStyle('code, kbd, samp, pre', {
  fontFamily: 'monospace' /* 1 */,
  fontSize: '1em' /* 2 */,
})

/*
Add the correct font size in all browsers.
*/

globalStyle('small', {
  fontSize: '80%',
})

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

globalStyle('sub, sup', {
  fontSize: '75%',
  lineHeight: 0,
  position: 'relative',
  verticalAlign: 'baseline',
})

globalStyle('sub', {
  bottom: '-0.25em',
})

globalStyle('sup', {
  top: '-0.5em',
})

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

globalStyle('table', {
  textIndent: 0 /* 1 */,
  borderColor: 'inherit' /* 2 */,
  borderCollapse: 'collapse' /* 3 */,
})

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit' /* 1 */,
  fontSize: '100%' /* 1 */,
  lineHeight: 'inherit' /* 1 */,
  color: 'inherit' /* 1 */,
  margin: 0 /* 2 */,
  padding: 0 /* 3 */,
})

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

globalStyle('button, select', {
  textTransform: 'none',
})

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

globalStyle("button, [type='button'], [type='reset'], [type='submit']", {
  WebkitAppearance: 'button' /* 1 */,
  backgroundColor: 'transparent' /* 2 */,
  backgroundImage: 'none' /* 2 */,
})

/*
Use the modern Firefox focus style for all focusable elements.
*/

globalStyle(':-moz-focusring', {
  outline: 'auto',
})

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

globalStyle(':-moz-ui-invalid', {
  boxShadow: 'none',
})

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

globalStyle('progress', {
  verticalAlign: 'baseline',
})

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

globalStyle('::-webkit-inner-spin-button, ::-webkit-outer-spin-button', {
  height: 'auto',
})

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

globalStyle("[type='search']", {
  WebkitAppearance: 'textfield' /* 1 */,
  outlineOffset: '-2px' /* 2 */,
})

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

globalStyle('::-webkit-search-decoration', {
  WebkitAppearance: 'none',
})

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

globalStyle('::-webkit-file-upload-button', {
  WebkitAppearance: 'button' /* 1 */,
  font: 'inherit' /* 2 */,
})

/*
Add the correct display in Chrome and Safari.
*/

globalStyle('summary', {
  display: 'list-item',
})

/*
Removes the default spacing and border for appropriate elements.
*/

globalStyle('blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre', {
  margin: 0,
})

globalStyle('fieldset', {
  margin: 0,
  padding: 0,
})

globalStyle('legend', {
  padding: 0,
})

globalStyle('ol, ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

/*
Prevent resizing textareas horizontally by default.
*/
globalStyle('textarea', {
  resize: 'vertical',
})

/*
1. Reset the default placeholder opacity in Firefox.
2. Set the default placeholder color.
*/

globalStyle('input::placeholder, textarea::placeholder', {
  color: 'currentColor',
  opacity: '1',
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

/*
Set the default cursor for buttons.
*/

globalStyle('button, [role="button"]', {
  cursor: 'pointer',
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
