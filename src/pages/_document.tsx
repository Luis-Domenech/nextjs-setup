import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { config } from '../theme'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" 
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}