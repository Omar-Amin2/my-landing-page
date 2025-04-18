'use client'
import { Box, Container, Heading, Text, Icon, Link, IconButton, HStack, VStack, Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { FaHeart, FaRegHeart, FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa'
import { THEME_COLORS, spacing } from '../constants'
import { useState, useRef } from 'react'

const RatingStars = ({ rating }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Icon key={i} as={FaStar} color={THEME_COLORS.bronzeNude} />)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Icon key={i} as={FaStarHalf} color={THEME_COLORS.bronzeNude} />)
    } else {
      stars.push(<Icon key={i} as={FaRegStar} color={THEME_COLORS.bronzeNude} />)
    }
  }
  return <HStack spacing={1}>{stars}</HStack>
}

const hotels = [
  {
    id: 1,
    name: 'Kempinski Hotel Soma Bay',
    location: 'Soma Bay',
    rating: 4.7,
    reviews: '1,274',
    price: 214,
    bookingUrl: 'https://booking.com/kempinski-soma-bay',
    previewImage: '/soma-bay-booking.jpg',
    websiteName: 'Booking.com'
  },
  {
    id: 2,
    name: 'JW Marriott Hotel Cairo',
    location: 'Cairo',
    rating: 4.6,
    reviews: '2,274',
    price: 194,
    bookingUrl: 'https://booking.com/jw-marriott-cairo',
    previewImage: '/cairo-booking.jpg',
    websiteName: 'Booking.com'
  },
  {
    id: 3,
    name: 'Kempinski Hotel Soma Bay',
    location: 'Soma Bay',
    rating: 4.7,
    reviews: '1,274',
    price: 214,
    bookingUrl: 'https://booking.com/kempinski-soma-bay',
    previewImage: '/soma-bay-booking.jpg',
    websiteName: 'Booking.com'
  },
  {
    id: 4,
    name: 'JW Marriott Hotel Cairo',
    location: 'Cairo',
    rating: 4.6,
    reviews: '2,274',
    price: 194,
    bookingUrl: 'https://booking.com/jw-marriott-cairo',
    previewImage: '/cairo-booking.jpg',
    websiteName: 'Booking.com'
  },
]

export default function MostRelevantSection() {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enrichedHotels, setEnrichedHotels] = useState(hotels)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleFavorite = (e, hotelId) => {
    e.preventDefault() // Prevent link navigation
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    )
  }

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth / 2; // Show 2 cards
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    const totalCards = hotels.length;
    
    let newIndex = direction === 'left' 
      ? currentIndex - 1 
      : currentIndex + 1;

    if (newIndex < 0) {
      newIndex = totalCards - 2;
      container.scrollTo({ left: container.scrollWidth - (cardWidth * 2), behavior: 'smooth' });
    } else if (newIndex >= totalCards - 1) {
      newIndex = 0;
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
    setCurrentIndex(newIndex);
  };

  return (
    <Box py={{ base: 2, md: 4 }}>
      <Container maxW="container.xl" px={spacing.section.px}>
        <HStack 
          justify="space-between" 
          mb={{ base: 3, md: 4 }}
          spacing={spacing.element.gap}
        >
          <Heading 
            size={{ base: "xl", lg: "2xl" }} 
            color="white"
          >
            The Most Relevant
          </Heading>
        </HStack>

        <Box position="relative">
          <IconButton
            icon={<ChevronLeftIcon color={THEME_COLORS.bronzeNude} boxSize={8} />}
            position="absolute"
            left={{ base: 2, md: "-40px" }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg="white"
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => scroll('left')}
          />

          <Flex 
            ref={scrollContainerRef}
            gap={spacing.element.gap}
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
            {hotels.map((hotel, index) => (
              <Box 
                key={hotel.id} 
                p={spacing.element.gap}
                flex={{ base: "0 0 85%", md: "0 0 calc(40% - 12px)" }}
              >
                <Link 
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box position="relative">
                    {/* Heart Icon Button */}
                    <IconButton
                      aria-label="Add to favorites"
                      icon={favorites.includes(hotel.id) ? <FaHeart /> : <FaRegHeart />}
                      position="absolute"
                      top={4}
                      right={4}
                      zIndex={2}
                      rounded="full"
                      bg="white"
                      color={favorites.includes(hotel.id) ? THEME_COLORS.bronzeNude : "gray.600"}
                      onClick={(e) => toggleFavorite(e, hotel.id)}
                      _hover={{
                        transform: "scale(1.1)",
                      }}
                      transition="all 0.2s"
                    />
                    
                    {/* Rest of the card structure */}
                    <Box
                      borderRadius="3xl"
                      overflow="hidden"
                      position="relative"
                      pb={6}
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "translateY(-8px)",
                        boxShadow: "xl",
                        '& > .overlay': {
                          opacity: 1
                        }
                      }}
                    >
                      {/* Add overlay */}
                      <Box
                        className="overlay"
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.400"
                        transition="opacity 0.3s ease"
                        opacity={0}
                        zIndex={1}
                      />
                      {/* Location Tag - Moved to overlay on image */}
                      <Box 
                        position="absolute"
                        top={4}
                        left={4}
                        zIndex={1}
                        bg="rgba(0,0,0,0.7)"
                        px={4}
                        py={2}
                        borderRadius="full"
                        border={`1px solid ${THEME_COLORS.bronzeNude}`}
                      >
                        <Text 
                          color="white"
                          fontSize="sm"
                          fontWeight="medium"
                        >
                          {hotel.location}
                        </Text>
                      </Box>

                      <Box 
                        position="relative" 
                        h="300px"
                        overflow="hidden"
                        mb={-6}
                        borderRadius={"3xl"}
                      >
                        <Image
                          src={hotel.previewImage}
                          alt={`${hotel.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                      <Box 
                        p={6} 
                        pt={10}
                        bg="white"
                        borderBottomRadius="3xl"
                      >
                        <VStack align="stretch" spacing={3}>
                          {/* Hotel Name */}
                          <Heading 
                            size="md" 
                            noOfLines={1} 
                            title={hotel.name}
                            color="black"
                          >
                            {hotel.name}
                          </Heading>

                          {/* Rating Stars and Book Now */}
                          <HStack justify="space-between" align="center">
                            <VStack align="start" spacing={1}>
                              <RatingStars rating={hotel.rating} />
                              <HStack spacing={2} fontSize="sm" color="gray.600">
                                <Text fontWeight="bold">{hotel.rating}</Text>
                                <Text>({hotel.reviews} reviews)</Text>
                              </HStack>
                            </VStack>
                            <HStack spacing={4} align="center">
                              <HStack spacing={1} align="baseline">
                                <Text 
                                  fontSize="lg"
                                  color={THEME_COLORS.bronzeNude}
                                  fontWeight="bold"
                                >
                                  ${hotel.price}
                                </Text>
                                <Text fontSize="xs" color="gray.500">/ night</Text>
                              </HStack>
                              <Text
                                as="button"
                                px={4}
                                py={2}
                                bg={THEME_COLORS.bronzeNude}
                                color="white"
                                fontSize="sm"
                                fontWeight="medium"
                                rounded="full"
                                _hover={{
                                  opacity: 0.9,
                                  transform: "translateY(-1px)"
                                }}
                                transition="all 0.2s"
                              >
                                Book Now
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </Box>
                    </Box>
                  </Box>
                </Link>
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
            bg="white"
            _hover={{
              opacity: 0.8,
            }}
            onClick={() => scroll('right')}
          />
        </Box>
      </Container>
    </Box>
  );
}
