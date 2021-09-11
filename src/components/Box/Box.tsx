import * as React from 'react'
import clsx, { ClassValue } from 'clsx'

import { Atoms, atoms } from '~/theme'
import * as resetStyles from '~/theme/reset.css'

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  'as' | 'color' | 'height' | 'width'
>

export type BoxProps = {
  as?: React.ElementType
  children?: React.ReactNode
  className?: ClassValue
} & Atoms &
  HTMLProperties

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as = 'div', className, ...props }: BoxProps, ref) => {
    const atomProps: Record<string, unknown> = {}
    const nativeProps: Record<string, unknown> = {}

    for (const key in props) {
      if (atoms.properties.has(key as keyof Atoms)) {
        atomProps[key] = props[key as keyof typeof props]
      } else {
        nativeProps[key] = props[key as keyof typeof props]
      }
    }

    return React.createElement(as, {
      className: clsx(
        resetStyles.base,
        resetStyles.element[as as keyof typeof resetStyles.element],
        atoms(atomProps),
        className,
      ),
      ...nativeProps,
      ref,
    })
  },
)
