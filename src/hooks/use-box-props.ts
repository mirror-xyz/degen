import { Atoms } from '~/styles/atoms.css'

export const useBoxProps = (props: Partial<Atoms>) => {
  let filteredProps = {}
  for (const [key, val] of Object.entries(props)) {
    if (val !== undefined) {
      filteredProps = { ...filteredProps, [key]: val }
    }
  }
  return filteredProps
}
