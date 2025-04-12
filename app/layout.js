'use client';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
