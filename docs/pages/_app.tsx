import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'

import { getLayout as getSiteLayout } from 'layouts/site'
import { MDX } from 'components'
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
            // prettier-ignore
            __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode")).replace(" mode=","");if(e){${updateDOM('e')}}else{${updateDOM('light')};}}catch(t){}}();`,
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

const updateDOM = (value: string) => {
  return `d.setAttribute('data-theme', ${value})`
}

export default App
