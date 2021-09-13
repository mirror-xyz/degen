import {
  OptionalResponsiveObject,
  OptionalResponsiveValue,
  mapResponsiveValue,
} from '~/theme'
export type Direction = 'horizontal' | 'vertical'

const directionToFlexDirectionLookup = {
  horizontal: 'row',
  vertical: 'column',
} as const

export const directionToFlexDirection = (
  direction: OptionalResponsiveValue<Direction> | undefined,
) =>
  direction
    ? mapResponsiveValue(
        direction,
        (value) => directionToFlexDirectionLookup[value],
      )
    : undefined

type Wrap = 1 | 0

const wrapToFlexWrapLookup = {
  1: 'wrap',
  0: 'nowrap',
} as const

export const wrapToFlexWrap = (
  wrap: OptionalResponsiveObject<true | false> | undefined,
) =>
  wrap
    ? mapResponsiveValue(
        <any>(typeof wrap == 'boolean' ? { xs: wrap } : wrap),
        // Hack to convert boolean to number since Sprinkles does not support
        // boolean responsive keys
        (value) => wrapToFlexWrapLookup[+value as Wrap],
      )
    : undefined
