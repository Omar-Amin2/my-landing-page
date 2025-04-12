'use client'
import Image from 'next/image';
import { Box, Container, Heading, Text, Button, Stack, HStack, Input, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaLocationArrow } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <Box position="relative" height="calc(100vh - 80px)" width="100%" overflow="hidden">
      <Image
        src="/heroPic.png"
        alt="Egypt Hero Image"
        fill
        sizes="100vw"
        priority={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onError={(e) => {
          console.error('Error loading hero image:', e);
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
      />
      <Container maxW="container.xl" h="full">
        <Stack
          spacing={4}
          position="relative"
          top="50%"
          transform="translateY(-50%)"
          color="white"
          maxW="6xl"
        >
          <Box mb={2}>
            <HStack spacing={2} mb={2}>
              <Icon as={FaLocationArrow} color="white" boxSize={4} transform="rotate(0deg)" />
              <Text fontSize="lg" fontWeight="bold">Egypt</Text>
            </HStack>
            <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
              Hey!
            </Heading>
            <Heading as="h2" size="2xl" fontWeight="bold">
              Tell us where you want to stay
            </Heading>
          </Box>
          <Text fontSize="2xl" mb={6}>
            Book 450+ Curated Egyptian Hotels
          </Text>

          <HStack 
            spacing={6} 
            p={8} 
            bg="rgba(64, 64, 64, 0.4)"
            backdropFilter="blur(8px)"
            borderRadius="full"
            color="white"
            width="100%"
            boxShadow = "xl"
          >
            <HStack flex={1}>
              <Icon as={FaMapMarkerAlt} color="white" boxSize={5} />
              <Input placeholder="Cairo, Egypt" variant="unstyled" color="white" _placeholder={{ color: 'gray.300' }} />
            </HStack>
            <HStack flex={1}>
              <Icon as={FaCalendarAlt} color="white" boxSize={5} />
              <Input placeholder="19 March 2025 - 27 Mar.." variant="unstyled" color="white" _placeholder={{ color: 'gray.300' }} />
            </HStack>
            <HStack flex={1}>
              <Icon as={FaUsers} color="white" boxSize={5} />
              <Input placeholder="2 Adults, 1 Child, 1 Infant" variant="unstyled" color="white" _placeholder={{ color: 'gray.300' }} />
            </HStack>
            <Button 
              colorScheme="green" 
              size="lg" 
              px={12}
              py={7}
              borderRadius="full"
            >
              Explore Stays
            </Button>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
