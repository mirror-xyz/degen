import * as React from 'react'
import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MDX } from 'components'
import { getLayout as getSiteLayout } from 'layouts/site'
import { getThemeAccent, getThemeMode } from 'utils/cookies'

import { ThemeProvider } from '~/components'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const getLayout = Component.getLayout || getSiteLayout

  // Disable smooth scroll for route changes
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const routeChangeStart = () => {
      document.documentElement.style.setProperty(
        'scroll-behavior',
        'auto',
        'important',
      )
    }
    const routeChangeComplete = () => {
      setTimeout(
        () => document.documentElement.style.removeProperty('scroll-behavior'),
        1,
      )
    }

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <ThemeProvider
      defaultAccent={getThemeAccent()}
      defaultMode={getThemeMode() ?? 'dark'}
    >
      <Head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode"));if(e){d.setAttribute('data-theme',e.replace("mode=","").trim())}else{d.setAttribute('data-theme','dark');}}catch(t){}}();`,
          }}
          key="theme-script"
        />
      </Head>

      <MDXProvider components={MDX}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
