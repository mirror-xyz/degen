import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'

import { getLayout as getSiteLayout } from 'layouts/site'

import { ThemeProvider } from '~/components'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || getSiteLayout

  return (
    <ThemeProvider>
      <MDXProvider components={{}}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
