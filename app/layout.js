'use client';
import './globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import { Providers } from './providers';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#1a1a1a", color: "white" }}>
        <ChakraProvider>
          <Providers>
            {children}
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
