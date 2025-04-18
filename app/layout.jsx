'use client'
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import theme from './theme/theme'
import { THEME_COLORS } from './constants'
import { AuthProvider } from './context/AuthContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden max-w-[100vw]">
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Box position="relative" minH="100vh" overflow="hidden">
              {children}
              <Box
                position="absolute"
                bottom={-50}
                left="50%"
                transform="translateX(-50%)"
                width="200%"
                aspectRatio="2/1"
                pointerEvents="none"
                bgGradient={`radial-gradient(50% 50% at 50% 100%, ${THEME_COLORS.bronzeNude}40 0%, transparent 70%)`}
                opacity={0.8}
                zIndex={1}
              />
            </Box>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}