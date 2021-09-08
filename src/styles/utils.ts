import { createVar } from '@vanilla-extract/css'

type CSSVarFunction = ReturnType<typeof createVar>

export const makeColor = (partial: string, alpha?: CSSVarFunction | string) =>
  alpha ? `rgba(${partial}, ${alpha})` : `rgb(${partial})`
