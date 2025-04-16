'use client'
import { Box, Heading, Text, Image, VStack, IconButton, Container, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../context/AuthContext';
import { THEME_COLORS } from '@/constants';

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

const DiscoverSection = () => {
  const { loggedIn } = useAuth();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' 
      ? -container.offsetWidth * 0.8 
      : container.offsetWidth * 0.8;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const items = [
    { id: 1, image: '/redSea.jpeg', title: 'Red Sea', description: 'Explore the beautiful Red Sea coast.' },
    { id: 2, image: '/somaBay.jpeg', title: 'Soma Bay', description: 'Discover the pristine waters of Soma Bay.' },
    { id: 3, image: '/giza.jpeg', title: 'Giza', description: 'Marvel at the Great Pyramids of Giza.' },
    { id: 4, image: '/nile.jpeg', title: 'Nile', description: 'Experience the majestic Nile River.' },
    { id: 5, image: '/nabqBay.jpeg', title: 'Nabq Bay', description: 'Relax at the serene Nabq Bay.' },
    { id: 6, image: '/others.jpeg', title: 'Others', description: 'Discover other amazing destinations.' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.xl" px={{ base: 0, md: 6 }}>
        <Heading 
          size={{ base: "xl", lg: "2xl" }} 
          color="white"
          mb={{ base: 6, md: 10 }}
          px={{ base: 4, md: 0 }}
        >
          Discover New Places
        </Heading>

        <Box position="relative">
          <IconButton
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={{ base: 0, md: -5 }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg="white"
            size={{ base: "sm", md: "md" }}
            onClick={() => scroll('left')}
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
            {items.map((item) => (
              <Box 
                key={item.id} 
                p={2}
                flex={{ base: "0 0 85%", md: "0 0 calc(40% - 12px)" }}
              >
                <VStack
                  bg="gray.900"
                  borderRadius="lg"
                  overflow="hidden"
                  h="350px"
                  align="start"
                  margin="1px"
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(200,160,130,0.3)]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fallback={<Box h="180px" bg="gray.800" />}
                    objectFit="cover"
                    h="180px"
                    w="100%"
                  />
                  <Box p={6} flex="1">
                    <Heading as="h3" size="md" mb={3} color="white">
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.400">
                      {item.description}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            ))}
          </Flex>

          <IconButton
            icon={<ChevronRightIcon />}
            position="absolute"
            right={{ base: 0, md: -5 }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg="white"
            size={{ base: "sm", md: "md" }}
            onClick={() => scroll('right')}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DiscoverSection;
