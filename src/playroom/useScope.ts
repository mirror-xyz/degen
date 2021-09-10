import { useTheme } from '~/theme'

const useScope = () => ({
  click: () => alert('Nice click :)'),
  theme: useTheme(),
})

export default useScope
