'use client'
import { Box, Container, Heading, Text, Icon, Link, IconButton, HStack, VStack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { FaHeart, FaRegHeart, FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa'
import { THEME_COLORS } from '@/constants'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useState } from 'react'

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
]

export default function MostRelevantSection() {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  const displayHotels = enrichedHotels.length < 3 
    ? [...enrichedHotels, ...enrichedHotels, ...enrichedHotels].slice(0, 6)
    : enrichedHotels;

  return (
    <Box py={{ base: 8, md: 16, lg: 20 }} bg={THEME_COLORS.background}>
      <Container maxW="container.xl">
        <Heading 
          mb={{ base: 6, md: 8, lg: 10 }} 
          size={{ base: "xl", lg: "2xl" }} 
          color="white"
        >
          The Most Relevant
        </Heading>
        
        <Box position="relative" px={{ base: 2, md: 6, lg: 8 }}>
          <Slider {...settings}>
            {displayHotels.map((hotel, index) => (
              <Box key={`${hotel.id}-${index}`} p={2}>
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
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                      <Box 
                        p={5} 
                        bg="white"
                        borderBottomRadius="3xl"
                      >
                        <VStack align="stretch" spacing={4}>
                          {/* Top Row - Location Tag and Price */}
                          <HStack justify="space-between" align="center">
                            <Text 
                              fontSize="xs" 
                              px={3} 
                              py={1} 
                              bg={`${THEME_COLORS.bronzeNude}10`}
                              rounded="full"
                              color={THEME_COLORS.bronzeNude}
                              fontWeight="medium"
                            >
                              {hotel.location}
                            </Text>
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
          </Slider>
        </Box>
      </Container>
    </Box>
  )
}
