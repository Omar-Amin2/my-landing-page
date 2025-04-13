'use client'
import { Box, Container, Heading, Text, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { THEME_COLORS } from '@/constants'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const CustomArrow = ({ direction, onClick }) => (
  <IconButton
    aria-label={`${direction} arrow`}
    icon={direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    onClick={onClick}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    {...(direction === 'left' ? { left: "-40px" } : { right: "-40px" })}
    zIndex={2}
    rounded="full"
    bg={THEME_COLORS.bronzeNude}
    color="white"
    _hover={{
      bg: THEME_COLORS.bronzeNude,
      opacity: 0.8,
    }}
  />
);

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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <Box py={20} bg={THEME_COLORS.background}>
      <Container maxW="container.xl">
        <Heading 
          size="2xl" 
          color="white" 
          mb={10}
        >
          Trending Destinations
        </Heading>
        
        <Box position="relative" px={8}>
          <Slider {...settings}>
            {destinations.map((destination) => (
              <Box key={destination.id} p={2}>
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
          </Slider>
        </Box>
      </Container>
    </Box>
  );
}
