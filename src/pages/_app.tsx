import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { Scrollbar } from 'react-scrollbars-custom'

import { LanguageProvider } from '../contexts/LanguageProvider'
import '../styles/globals.scss'

function App({ Component, pageProps, cookies }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Scrollbar style={{ width: "100vw", height: "100vh"}} momentum={true} removeTracksWhenNotUsed={true}>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </Scrollbar>
    </ChakraProvider>
  )
}

export default App

