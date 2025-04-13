'use client'
import './globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme/theme'
import { AuthProvider } from './context/AuthContext'
import { THEME_COLORS } from '@/constants'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Box position="relative" minH="100vh" overflow="hidden">
              {children}
              <Box
                position="absolute"
                bottom={-10}
                left={-10}
                right={-10}
                height="300px"
                pointerEvents="none"
                bgGradient={`linear(to-t, ${THEME_COLORS.bronzeNude}50, ${THEME_COLORS.bronzeNude}20, transparent)`}
                zIndex={0}
                transform="scale(1.1)"
              />
            </Box>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  )
}