'use client'
import { Box, Heading, Text, Image, VStack, IconButton, Container } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
    <Box as="section" bg={THEME_COLORS.background} py={10} textAlign="left">
      <Container maxW="container.xl">
        <Box mb={12}>
          <Heading 
            as="h2" 
            size="2xl" 
            mb={4}
            color="white"
          >
            Discover New Places
          </Heading>
          <Text fontSize="lg" color="gray.400">
            Explore our curated collection of items just for you.
          </Text>
        </Box>
        <Box position="relative" px={8}>
          <Slider {...settings}>
            {items.map((item) => (
              <Box key={item.id} p={2}>
                <VStack
                  bg="gray.900"
                  borderRadius="lg"
                  overflow="hidden"
                  h="350px"
                  align="start"
                  margin="1px"
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(200,160,130,0.3)] hover:shadow-bronzeNude/30"
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
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default DiscoverSection;
