import * as React from 'react'

import { Box } from '../Box'
import * as styles from './styles.css'

type Props = styles.Variants & {
  goal: number
  label: string
  loading?: boolean
  stretchGoal?: number
  value: number
}

export const ProgressBar = ({
  goal,
  label,
  loading,
  stretchGoal,
  value,
  size = 'md',
}: Props) => {
  if (stretchGoal && stretchGoal < goal)
    throw Error('stretchGoal must be greater than goal')

  let percentage: number
  if (loading) percentage = 0
  else
    percentage =
      value >= goal && value < (stretchGoal ?? 0)
        ? 0.95
        : Math.min(1, value / goal)

  const maxValue = value >= goal && stretchGoal ? stretchGoal : goal
  const textValue = `${(value / maxValue) * 100}%`
  const funded =
    (stretchGoal && value >= stretchGoal) || (!stretchGoal && value >= goal)

  const min = 10
  const max = 105
  const percentageOffset = percentage * (max - min) + min

  return (
    <Box
      aria-label={label}
      aria-valuemax={maxValue}
      aria-valuemin={0}
      aria-valuenow={loading ? undefined : value}
      aria-valuetext={textValue}
      className={styles.variants({ size })}
      role="progressbar"
    >
      <Box
        backgroundColor={funded && !loading ? 'green' : 'accent'}
        height="full"
        style={{ width: `${percentageOffset}%` }}
      />
    </Box>
  )
}

ProgressBar.displayName = 'ProgressBar'
