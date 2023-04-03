import clsx from 'clsx'

import * as resetStyles from './reset.css'
import { Sprinkles, sprinkles } from './sprinkles.css'

export type Atoms = Sprinkles & {
  reset?: resetStyles.Element & keyof JSX.IntrinsicElements
}

export const atoms = ({ reset, ...rest }: Atoms) => {
  const sprinklesClasses = sprinkles(rest)

  return clsx(
    reset && [resetStyles.base, resetStyles.element[reset]],
    sprinklesClasses,
  )
}
