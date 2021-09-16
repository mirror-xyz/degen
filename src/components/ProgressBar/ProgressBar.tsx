import * as React from 'react'

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
  if (withFunded(props)) {
    percentage = 1
  } else if (withLoading(props)) {
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

const withFunded = (props: Props): props is PropsWithFunded => {
  return (props as PropsWithFunded).funded !== undefined
}

const withLoading = (props: Props): props is PropsWithLoading => {
  return (props as PropsWithLoading).loading !== undefined
}