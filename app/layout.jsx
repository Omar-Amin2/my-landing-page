'use client'
import './globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme/theme'
import { AuthProvider } from './context/AuthContext'
import { THEME_COLORS } from '@/constants'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Box
              position="relative"
              minH="100vh"
              bg={THEME_COLORS.background}
              className="relative min-h-screen overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-gradient from-bronze/30 to-transparent pointer-events-none z-0" />
              <Box position="relative" zIndex={1}>
                {children}
              </Box>
            </Box>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  )
}