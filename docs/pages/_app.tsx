import { AppProps } from 'next/app'

import { Box, ThemeProvider } from '~/components'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Box backgroundColor="background" minHeight="viewHeight">
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  )
}

export default App
