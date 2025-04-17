'use client'
import { useRef, useState } from 'react'
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
  {
    id: 4,
    name: 'Luxor & Aswan',
    description: 'Journey through Ancient Egyptian heritage.',
    image: '/Luxor.jpeg',
  },
];

const getGradientOverlay = (name) => {
  switch(name) {
    case 'Cairo':
      return 'linear-gradient(to right, rgba(255, 140, 0, 0.7) 0%, rgba(255, 98, 0, 0) 80%)';
    case 'Hurghada':
      return 'linear-gradient(to right, rgba(0, 120, 255, 0.7) 0%, rgba(0, 190, 255, 0) 80%)';
    case 'Sharm':
      return 'linear-gradient(to right, rgba(237, 47, 47, 0.7) 0%, rgba(255, 90, 90, 0) 80%)';
    case 'Luxor & Aswan':
      return 'linear-gradient(to right, rgba(128, 0, 128, 0.7) 0%, rgba(180, 90, 180, 0) 80%)';
    default:
      return 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 80%)';
  }
};

export default function Trending() {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth / 2; // 2 cards visible
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    if (direction === 'right' && currentIndex >= destinations.length - 2) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      setCurrentIndex(0);
    } else if (direction === 'left' && currentIndex === 0) {
      container.scrollTo({ left: container.scrollWidth - cardWidth * 2, behavior: 'smooth' });
      setCurrentIndex(destinations.length - 2);
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => direction === 'left' ? prev - 1 : prev + 1);
    }
  };

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.xl" px={{ base: 0, md: 6 }}>
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
            icon={<ChevronLeftIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
            position="absolute"
            top="50%"
            left={{ base: 2, md: "-40px" }}
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            color="white"
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => handleScroll('left')}
          />

          <Flex 
            ref={scrollContainerRef}
            gap={{ base: 3, md: 4 }}
            overflowX="auto"
            pl={{ base: 4, md: 0 }}
            pr={{ base: 0, md: 0 }}
            mr={{ base: "-20%", md: "-10%" }}
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollSnapType: 'x mandatory',
              '& > div': {
                scrollSnapAlign: 'start',
              }
            }}
          >
            {destinations.map((destination) => (
              <Box 
                key={destination.id} 
                p={2}
                flex={{ base: "0 0 85%", md: "0 0 calc(40% - 12px)" }}
              >
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
                      ${getGradientOverlay(destination.name)},
                      linear-gradient(to bottom, 
                        rgba(0,0,0,0.4) 0%, 
                        transparent 30%,
                        transparent 70%,
                        rgba(0,0,0,0.4) 100%)
                    `}
                    color="white"
                  >
                    <Box>
                      <Heading size="xl" mb={2}>
                        {destination.name}
                      </Heading>
                      <Text 
                        fontSize= "xx-large"
                        opacity={0.9}
                      >
                        {destination.description}
                      </Text>
                    </Box>

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
            icon={<ChevronRightIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
            position="absolute"
            top="50%"
            right={{ base: 2, md: "-40px" }}
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            color="white"
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => handleScroll('right')}
          />
        </Box>
      </Container>
    </Box>
  );
}
