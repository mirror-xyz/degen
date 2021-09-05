import { createVar } from '@vanilla-extract/css'
import CSS from 'csstype'

import { baseVars } from './theme.css'

type CSSVarFunction = ReturnType<typeof createVar>

export const getPropertyOpacity = (alpha: CSSVarFunction) =>
  Object.entries(baseVars.opacity).reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: { vars: { [alpha]: curr[1] } },
    }),
    <{ [Prop in keyof typeof baseVars.opacity]: string }>{},
  )

export const getColorWithAlpha = (
  property: keyof CSS.Properties,
  partial: string,
  alpha: CSSVarFunction,
) => ({
  vars: { [alpha]: '1' },
  [property]: `rgba(${partial} / ${alpha})`,
})

export const getColor = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`
