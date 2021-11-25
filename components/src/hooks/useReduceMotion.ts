import * as React from 'react'

export const useReduceMotion = () => {
  const [matches, setMatch] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setMatch(mq.matches)
    }
    handleChange()
    mq.addEventListener('change', handleChange)
    return () => {
      mq.removeEventListener('change', handleChange)
    }
  }, [])

  return matches
}
