import * as React from 'react'

type CreateBoxParams<AtomsFn> = {
  atoms: AtomsFn
  defaultClassName?: string
}

type AtomsFnBase = {
  (...args: any): string
  properties: Set<string>
}

type OmittedProperties = 'as' | 'color' | 'width' | 'height'

export const createBox = <AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) => {
  type BoxProps = {
    as?: React.ElementType
    children?: React.ReactNode
    className?: string
  } & Parameters<AtomsFn>[0] &
    Omit<React.AllHTMLAttributes<HTMLElement>, OmittedProperties>

  const Box = React.forwardRef<HTMLElement, BoxProps>(
    ({ as: element = 'div', className, ...props }: BoxProps, ref) => {
      let hasAtomProps = false
      const atomProps: Record<string, unknown> = {}
      const otherProps: Record<string, unknown> = {}

      for (const key in props) {
        if (atomsFn.properties.has(key)) {
          hasAtomProps = true
          atomProps[key] = props[key]
        } else {
          otherProps[key] = props[key]
        }
      }

      return React.createElement(element, {
        ref,
        ...otherProps,
        className:
          (hasAtomProps || className
            ? `${className ?? ''}${hasAtomProps && className ? ' ' : ''}${
                hasAtomProps ? atomsFn(atomProps) : ''
              }`
            : undefined) + (defaultClassName ? ` ${defaultClassName}` : ''),
      })
    },
  )

  const createVariants = <VariantKeys extends string>(
    variants: Record<VariantKeys, Parameters<AtomsFn>[0]>,
  ) => variants

  return { Box, createVariants }
}

export const createBoxWithAtomsProp = <AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) => {
  type BoxProps = {
    as?: React.ElementType
    children?: React.ReactNode
    className?: string
    atoms?: Parameters<AtomsFn>[0]
  } & Omit<React.AllHTMLAttributes<HTMLElement>, OmittedProperties>

  const Box = React.forwardRef<HTMLElement, BoxProps>(
    ({ as: element = 'div', className, atoms, ...props }, ref) => {
      const hasAtomProps = typeof atoms !== 'undefined'

      return React.createElement(element, {
        ref,
        ...props,
        className:
          (hasAtomProps || className
            ? `${className ?? ''}${hasAtomProps && className ? ' ' : ''}${
                hasAtomProps ? atomsFn(atoms) : ''
              }`
            : undefined) + (defaultClassName ? ` ${defaultClassName}` : ''),
      })
    },
  )

  const createVariants = <VariantKeys extends string>(
    variants: Record<VariantKeys, Parameters<AtomsFn>[0]>,
  ) => variants

  return { Box, createVariants }
}
