import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="light">
      <Head>
        <link rel="icon" href="/assets/images/favicon-32x32.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* plugin JS menggunakan next/script */}
        <Script src="/styles/assets/js/jquery.min.js" strategy="afterInteractive" />
        <Script src="/styles/assets/js/pace.min.js" strategy="afterInteractive" />
      </body>
    </Html>
  )
}
