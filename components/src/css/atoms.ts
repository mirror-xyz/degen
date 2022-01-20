import clsx from 'clsx'

import * as resetStyles from './reset.css'
import { Sprinkles, sprinkles } from './sprinkles.css'
import { getInjectedStyleClasses } from './injectedStyles'

export type Atoms = Sprinkles & {
  reset?: resetStyles.Element & keyof JSX.IntrinsicElements
}

export const atoms = ({ reset, ...rest }: Atoms) => {
  const sprinklesClasses = sprinkles(rest)
  const injectedStyleClasses = getInjectedStyleClasses(rest)

  return clsx(
    reset && [resetStyles.base, resetStyles.element[reset]],
    sprinklesClasses,
    injectedStyleClasses,
  )
}
