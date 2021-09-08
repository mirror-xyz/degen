import clsx from 'clsx'
import * as React from 'react'

import { Background, backgroundVariants } from '~/styles/variants'
import { Box } from '../box'

type variant = 'grid' | 'list'
type columns = 'md' | 'lg'

type Props = {
  background?: Background
  children?: React.ReactNode
  padding?: boolean
  // paddingX?: boolean | typeSpace
  // paddingY?: boolean | typeSpace
  variant?: variant
  columns?: columns
  offset?: boolean
  fill?: boolean
  // width?: width
}

export const Container = ({
  // fill,
  children,
  // variant,
  // padding,
  offset,
  background,
}: // paddingX,
// paddingY,
// columns,
// width,
Props) => {
  const styles = clsx(background && backgroundVariants[background])
  return (
    <Box
      alignItems="center"
      className={styles}
      display="flex"
      flexDirection="column"
      mt={offset ? 0.5 : undefined}
      position="relative"
      w="full"
    >
      <Box w="full">{children}</Box>
    </Box>
  )
  // return (
  //   <div
  //     sx={{
  //       flex: fill !== false ? 1 : null,
  //       ...getPadding({ variant, padding, paddingX, paddingY }),
  //     }}
  //   >
  //     <div
  //       sx={{
  //         gridTemplateColumns: getGridColumns(columns),
  //         maxWidth: getWidth(width),
  //         flex: fill !== false ? 1 : null,
  //         ...getDisplay({ variant }),
  //       }}
  //     >
  //       {children}
  //     </div>
  //   </div>
  // )
}
