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

    const visibleCards = 4.5;  
    const cardWidth = container.offsetWidth / visibleCards;
    const totalCards = items.length;
    
    let newIndex = direction === 'left' 
      ? currentIndex - 1 
      : currentIndex + 1;

    if (newIndex < 0) {
      newIndex = totalCards - 1;
      container.scrollTo({ left: container.scrollWidth - (cardWidth * visibleCards), behavior: 'smooth' });
    } else if (newIndex >= totalCards - (visibleCards - 1)) {
      newIndex = 0;
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    }
    
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
    <Box py={{ base: 2, md: 4 }}>
      <Container maxW="container.xl">
        <Heading 
          size={{ base: "xl", lg: "2xl" }} 
          color="white"
          mb={{ base: 3, md: 4 }}
          px={{ base: 4, md: 0 }}
        >
          Discover New Places
        </Heading>

        <Box position="relative">
          <IconButton
            icon={<ChevronLeftIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
            position="absolute"
            left={{ base: 2, md: "-40px" }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            color="white"
            display={{ base: "none", md: "flex" }}  // Hide on mobile
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => scroll('left')}
          />

          <Flex 
            ref={scrollContainerRef}
            gap={{ base: 2, md: 1 }}  
            overflowX="auto"
            pl={{ base: 4, md: 0 }}
            pr={{ base: 4, md: 0 }}
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
                p={1}  
                flex={{ base: "0 0 80%", md: "0 0 calc(100% / 4.5 - 2px)" }}  
                transition="all 0.3s ease"
              >
                <Box
                  position="relative"
                  h="400px"
                  borderRadius="3xl"  
                  overflow="hidden"
                  cursor="pointer"
                  display="block"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "xl",
                    '& > .overlay': {
                      opacity: 1
                    }
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    className="overlay"
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.400"
                    transition="opacity 0.3s ease"
                    opacity={0}
                  />
                  <Box
                    position="absolute"
                    bottom={6}
                    left={6}
                    right={6}
                    px={4}
                    py={2}
                    zIndex={1}
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
            right={{ base: 2, md: "-40px" }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            color="white"
            display={{ base: "none", md: "flex" }}  // Hide on mobile
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => scroll('right')}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DiscoverSection;
