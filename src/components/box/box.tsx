import { atoms } from '~/styles/atoms.css'
import { createBox } from './create-box'

export type BoxProps = Parameters<typeof atoms>[0]

export const { Box, createVariants } = createBox({ atoms })

export const useBoxProps = (props: Partial<BoxProps>) => {
  let filteredProps = {}
  for (const [key, val] of Object.entries(props)) {
    if (val !== undefined) {
      filteredProps = { ...filteredProps, [key]: val }
    }
  }
  return filteredProps
}
