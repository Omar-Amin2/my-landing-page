'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    gold: {
      50: '#f7e6d8',
      100: '#e9c4a7',
      200: '#dba17c',
      300: '#cd7f32', // Main bronze color
      400: '#b66d2a',
      500: '#9e5c22',
      600: '#864b1a',
      700: '#6e3a12',
      800: '#56290a',
      900: '#3e1802',
    },
  },
})

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
