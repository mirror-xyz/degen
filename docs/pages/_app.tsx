import { AppProps } from 'next/app'

import '../styles/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
