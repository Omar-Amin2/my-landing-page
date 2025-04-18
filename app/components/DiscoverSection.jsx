'use client'
import { Box, Heading, Text, Image, VStack, IconButton, Container, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../context/AuthContext';
import { THEME_COLORS } from '../constants';

const CustomArrow = ({ direction, onClick }) => (
  <IconButton
    aria-label={`${direction} arrow`}
    icon={
      direction === 'left'
        ? <ChevronLeftIcon color={THEME_COLORS.bronzeNude} boxSize={8} />
        : <ChevronRightIcon color={THEME_COLORS.bronzeNude} boxSize={8} />
    }
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const visibleCards = 4.2;
    const cardWidth = container.offsetWidth / visibleCards;
    const totalCards = items.length;

    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = totalCards - 1; // Go to last card
      }
    } else {
      newIndex = currentIndex + 1;
      if (newIndex >= totalCards) {
        newIndex = 0; // Go to first card
      }
    }

    const targetScroll = newIndex * cardWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setCurrentIndex(newIndex);
  };

  const items = [
    { id: 1, image: '/redSea.jpeg', title: 'Red Sea' },
    { id: 2, image: '/somaBay.jpeg', title: 'Soma Bay' },
    { id: 3, image: '/giza.jpeg', title: 'Giza' },
    { id: 4, image: '/nile.jpeg', title: 'Nile' },
    { id: 5, image: '/nabqBay.jpeg', title: 'Nabq Bay' },
    { id: 6, image: '/others.jpeg', title: 'Others' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    centerPadding: '20px',
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
            icon={<ChevronLeftIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
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
            gap={{ base: 1, md: 2 }}
            overflowX="auto"
            pl={{ base: 4, md: 0 }}
            pr={{ base: 0, md: 0 }}
            mr={{ base: "-20%", md: "-10%" }}
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              '& > div': {
                scrollSnapAlign: 'start',
              }
            }}
          >
            {items.map((item) => (
              <Box 
                key={item.id}
                p={2}
                flex={{ base: "0 0 85%", md: "0 0 calc(100% / 4.2 - 8px)" }} // adjust for 4.2 cards
                transition="all 0.3s ease"
              >
                <Box
                  position="relative"
                  h="400px"
                  borderRadius="lg"
                  overflow="hidden"
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(200,160,130,0.3)]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    position="absolute"
                    bottom={6}
                    left={6}
                    right={6}
                    px={4}
                    py={2}
                  >
                    <Text 
                      color="white" 
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="extrabold"
                      textAlign="left"
                      letterSpacing="wide"
                      lineHeight="1.2"
                      textShadow="0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7)"
                    >
                      {item.title}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>

          <IconButton
            icon={<ChevronRightIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
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
