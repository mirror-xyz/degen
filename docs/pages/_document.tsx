import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* Fonts */}
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />

          {/* Preload fonts */}
          <link
            as="font"
            crossOrigin="anonymous"
            href="https://rsms.me/inter/font-files/Inter-roman.var.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="https://github.com/iaolo/iA-Fonts/blob/master/iA%20Writer%20Mono/Webfonts/iAWriterMonoS-Regular.woff2?raw=true"
            rel="preload"
            type="font/woff2"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
