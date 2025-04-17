'use client'
import { Box, Container, Heading, Text, Icon, Link, IconButton, HStack, VStack, Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { FaHeart, FaRegHeart, FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa'
import { THEME_COLORS } from '@/constants'
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
    
    // Calculate new index
    let newIndex = direction === 'left' 
      ? currentIndex - 1 
      : currentIndex + 1;

    // Handle circular scrolling
    if (newIndex < 0) {
      newIndex = hotels.length - 2;
      container.scrollTo({ left: container.scrollWidth - cardWidth * 2, behavior: 'instant' });
      setTimeout(() => {
        container.scrollTo({ left: container.scrollWidth - cardWidth * 3, behavior: 'smooth' });
      }, 0);
    } else if (newIndex >= hotels.length - 1) {
      newIndex = 0;
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
    setCurrentIndex(newIndex);
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
            size={{ base: "xl", lg: "2xl" }} 
            color="white"
          >
            The Most Relevant
          </Heading>
        </HStack>

        <Box position="relative">
          <IconButton
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={{ base: 2, md: -5 }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg="white"
            size={{ base: "sm", md: "md" }}
            onClick={() => scroll('left')}
            _hover={{ bg: 'white', transform: 'translateY(-50%) scale(1.1)' }}
            transition="all 0.2s"
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
            {hotels.map((hotel, index) => (
              <Box 
                key={hotel.id} 
                p={2}
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
                      className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(200,160,130,0.3)]"
                      position="relative"
                      pb={6}
                    >
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
                        p={5} 
                        bg="white"
                        borderBottomRadius="3xl"
                      >
                        <VStack align="stretch" spacing={4}>
                          {/* Price only */}
                          <HStack justify="flex-end" align="center">
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
                          </HStack>

                          {/* Hotel Name */}
                          <Heading 
                            size="md" 
                            noOfLines={1} 
                            title={hotel.name}
                            letterSpacing="tight"
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
                        </VStack>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </Flex>

          <IconButton
            icon={<ChevronRightIcon />}
            position="absolute"
            right={{ base: 2, md: -5 }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            bg="white"
            size={{ base: "sm", md: "md" }}
            onClick={() => scroll('right')}
            _hover={{ bg: 'white', transform: 'translateY(-50%) scale(1.1)' }}
            transition="all 0.2s"
          />
        </Box>
      </Container>
    </Box>
  );
}
