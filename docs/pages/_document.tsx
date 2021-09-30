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
            href="/fonts/mono/iAWriterMonoS-Regular.woff2"
            rel="preload"
            type="font/woff2"
          />

          {/* Favicons */}
          <link
            href="/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            href="/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
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
