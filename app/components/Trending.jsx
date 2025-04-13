'use client'
import { Box, Container, Heading, Text, IconButton, Flex, HStack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { THEME_COLORS } from '@/constants'

const destinations = [
  {
    id: 1,
    name: 'Cairo',
    description: 'Unveil secrets of ancient wonders.',
    image: '/pyramids.jpeg',
  },
  {
    id: 2,
    name: 'Hurghada',
    description: 'Sunshine, beaches, and vibrant reefs.',
    image: '/hurghada.jpeg',
  },
  {
    id: 3,
    name: 'Sharm',
    description: 'Dive into breathtaking underwater world.',
    image: '/sharm.jpeg',
  },
];

export default function Trending() {
  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.xl">
        <HStack 
          justify="space-between" 
          mb={{ base: 6, md: 10 }}
          px={{ base: 4, md: 0 }}
        >
          <Heading 
            size="2xl" 
            color="white"
          >
            Trending Destinations
          </Heading>
        </HStack>

        <Box position="relative">
          <IconButton
            aria-label="left arrow"
            icon={<ChevronLeftIcon />}
            position="absolute"
            top="50%"
            left={{ base: 2, md: "-40px" }}
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg={THEME_COLORS.bronzeNude}
            color="white"
            _hover={{
              bg: THEME_COLORS.bronzeNude,
              opacity: 0.8,
            }}
          />

          <Flex 
            gap={{ base: 3, md: 6 }}
            overflowX="auto"
            px={{ base: 4, md: 0 }}
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {destinations.map((destination) => (
              <Box key={destination.id} flex="0 0 auto" w={{ base: "80%", md: "30%" }}>
                <Box
                  position="relative"
                  h="400px"
                  borderRadius="2xl"
                  overflow="hidden"
                  className="transform transition-all duration-300 hover:-translate-y-2"
                >
                  <Box
                    as="img"
                    src={destination.image}
                    alt={destination.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    p={8}
                    background={`
                      linear-gradient(to bottom, 
                        rgba(0,0,0,0.7) 0%, 
                        transparent 30%,
                        transparent 70%,
                        rgba(0,0,0,0.4) 100%)
                    `}
                    color="white"
                  >
                    {/* Top text content */}
                    <Box>
                      <Heading size="xl" mb={2}>
                        {destination.name}
                      </Heading>
                      <Text 
                        fontSize="lg"
                        opacity={0.9}
                      >
                        {destination.description}
                      </Text>
                    </Box>

                    {/* Bottom button */}
                    <Box alignSelf="flex-start">
                      <Box
                        as="button"
                        px={6}
                        py={2}
                        bg="white"
                        color="gray.800"
                        rounded="full"
                        fontWeight="medium"
                        _hover={{
                          transform: "translateY(-1px)",
                          boxShadow: "lg"
                        }}
                        transition="all 0.2s"
                      >
                        See Hotels
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>

          <IconButton
            aria-label="right arrow"
            icon={<ChevronRightIcon />}
            position="absolute"
            top="50%"
            right={{ base: 2, md: "-40px" }}
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg={THEME_COLORS.bronzeNude}
            color="white"
            _hover={{
              bg: THEME_COLORS.bronzeNude,
              opacity: 0.8,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
