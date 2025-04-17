'use client'
import './globals.css'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme/theme'
import { AuthProvider } from './context/AuthContext'
import { THEME_COLORS } from '@/constants'
import { useEffect } from 'react'
import ClientOnly from './components/ClientOnly'

export default function RootLayout({ children }) {
  useEffect(() => {
    const handleError = (event) => {
      event.preventDefault()
      console.error('Caught error:', event.error)
    }

    window.addEventListener('unhandledrejection', handleError)
    return () => window.removeEventListener('unhandledrejection', handleError)
  }, [])

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning>
        <ClientOnly>
          <AuthProvider>
            <ChakraProvider theme={theme}>
              <Box position="relative" minH="100vh" overflow="hidden">
                {children}
                <Box
                  position="absolute"
                  bottom={-20}
                  left={-20}
                  right={-20}
                  height="500px"
                  pointerEvents="none"
                  bgGradient={`radial(circle at bottom, ${THEME_COLORS.bronzeNude}40 0%, ${THEME_COLORS.bronzeNude}20 30%, transparent 70%)`}
                  zIndex={0}
                  transform="scale(1.2)"
                  filter="blur(20px)"
                />
              </Box>
            </ChakraProvider>
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  )
}