import * as React from 'react'

import { isOfType } from '~/utils'
import { Box } from '../Box'
import * as styles from './styles.css'

type BaseProps = styles.Variants
type PropsWithFunded = { funded: true }
type PropsWithLoading = { loading: true }
type PropsWithValues = {
  goal: number
  loading?: boolean
  stretchGoal?: number
  value: number
}

type Props = BaseProps & (PropsWithFunded | PropsWithLoading | PropsWithValues)

export const ProgressBar = ({ size = 'md', ...props }: Props) => {
  let percentage: number
  if (isOfType<PropsWithFunded>(props, 'funded')) {
    percentage = 1
  } else if (isOfType<PropsWithLoading>(props, 'loading')) {
    percentage = 0
  } else {
    const { value, goal, stretchGoal } = props
    percentage =
      value >= goal && value < (stretchGoal ?? 0)
        ? 0.95
        : Math.min(1, value / goal)
  }
  console.log(percentage)
  return <Box className={styles.variants({ size })} />
}

ProgressBar.displayName = 'ProgressBar'
