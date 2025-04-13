"use client"
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'

export default function Error({ error, reset }) {
  return (
    <Container maxW="container.xl" py={20}>
      <Box textAlign="center">
        <Heading mb={4}>Something went wrong</Heading>
        <Text mb={6}>We apologize for the inconvenience</Text>
        <Button onClick={reset}>Try again</Button>
      </Box>
    </Container>
  )
}
