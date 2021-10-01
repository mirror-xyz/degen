import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'

import { MDX } from 'components'
import { getLayout as getSiteLayout } from 'layouts/site'
import { getThemeAccent, getThemeMode } from 'utils/cookies'

import { ThemeProvider } from '~/components'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || getSiteLayout

  return (
    <ThemeProvider
      defaultAccent={getThemeAccent()}
      defaultMode={getThemeMode()}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode")).replace(" mode=","");if(e){d.setAttribute('data-theme',e)}else{d.setAttribute('data-theme','light');}}catch(t){}}();`,
          }}
          key="next-themes-script"
        />
      </Head>

      <MDXProvider components={MDX}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
