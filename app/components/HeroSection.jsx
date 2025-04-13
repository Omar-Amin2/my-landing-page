'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Box, Container, Heading, Text, Button, Stack, HStack, Input, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaLocationArrow } from 'react-icons/fa';
import { THEME_COLORS } from '@/constants';
import { useAuth } from '../context/AuthContext';
import LocationPicker from './LocationPicker';
import DatePicker from './DatePicker';
import GuestPicker from './GuestPicker';

export default function HeroSection() {
  const { loggedIn } = useAuth();
  const [activeInput, setActiveInput] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDates, setSelectedDates] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');

  const handleClose = () => setActiveInput(null);

  return (
    <Box 
      position="relative" 
      height={{ base: "80vh", md: "60vh" }}
      maxHeight={{ base: "800px", md: "600px" }}
      width="100%" 
      overflow="hidden"
    >
      <Image
        src="/heroPic.png"
        alt="Egypt Hero Image"
        fill
        sizes="100vw"
        priority={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onError={(e) => {
          console.error('Error loading hero image:', e);
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
      />
      <Container maxW="container.xl" h="full">
        <Stack
          spacing={{ base: 2, md: 3 }}
          position="relative"
          top={{ base: "35%", md: "45%" }}
          transform="translateY(-45%)"
          px={{ base: 4, md: 0 }}
          color="white"
          maxW="5xl"
        >
          <Box mb={2}>
            <HStack spacing={2} mb={2}>
              <Icon as={FaLocationArrow} color="white" boxSize={4} transform="rotate(0deg)" />
              <Text fontSize="lg" fontWeight="bold">Egypt</Text>
            </HStack>
            <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
              {loggedIn ? 'Hey, Omar!' : 'Hey!'}
            </Heading>
            <Heading as="h2" size="2xl" fontWeight="bold">
              Tell us where you want to stay
            </Heading>
          </Box>
          <Text fontSize="2xl" mb={6}>
            Book 450+ Curated Egyptian Hotels
          </Text>

          <HStack 
            spacing={{ base: 2, md: 4 }} 
            p={{ base: 4, md: 6 }}
            flexDir={{ base: "column", md: "row" }}
            alignItems="stretch"
            bg="rgba(32, 32, 32, 0.75)"
            backdropFilter="blur(12px)"
            borderRadius="full"
            border={`1px solid ${THEME_COLORS.bronzeNude}`}
            color="white"
            width="100%"
            boxShadow="dark-lg"
          >
            <HStack 
              flex={1} 
              cursor="pointer" 
              onClick={() => setActiveInput('location')}
            >
              <Icon as={FaMapMarkerAlt} color={THEME_COLORS.bronzeNude} boxSize={5} />
              <Input 
                placeholder="Where are you going?"
                value={selectedLocation}
                readOnly
                cursor="pointer"
                variant="unstyled" 
                color="white" 
                _placeholder={{ color: 'gray.300' }} 
              />
            </HStack>
            <HStack 
              flex={1}
              cursor="pointer"
              onClick={() => setActiveInput('dates')}
            >
              <Icon as={FaCalendarAlt} color={THEME_COLORS.bronzeNude} boxSize={5} />
              <Input 
                placeholder="Add dates" 
                value={selectedDates}
                readOnly
                cursor="pointer"
                variant="unstyled"
                color="white"
                _placeholder={{ color: 'gray.300' }}
              />
            </HStack>
            <HStack 
              flex={1} 
              cursor="pointer"
              onClick={() => setActiveInput('guests')}
            >
              <Icon as={FaUsers} color={THEME_COLORS.bronzeNude} boxSize={5} />
              <Input 
                placeholder="Add guests"
                value={selectedGuests}
                readOnly
                cursor="pointer"
                variant="unstyled" 
                color="white" 
                _placeholder={{ color: 'gray.300' }} 
              />
            </HStack>
            <Button 
              bg={THEME_COLORS.bronzeNude}
              color="white"
              size="md"
              px={8}
              py={6}
              borderRadius= "full"
              _hover={{ opacity: 0.9 }}
              isDisabled={!selectedLocation || !selectedDates || !selectedGuests}
            >
              Explore Stays
            </Button>
          </HStack>
        </Stack>
      </Container>

      <LocationPicker 
        isOpen={activeInput === 'location'}
        onClose={handleClose}
        onSelect={setSelectedLocation}
        selectedDates={selectedDates}
        selectedGuests={selectedGuests}
      />

      <DatePicker
        isOpen={activeInput === 'dates'}
        onClose={handleClose}
        onSelect={setSelectedDates}
        selectedLocation={selectedLocation}
        selectedGuests={selectedGuests}
      />

      <GuestPicker
        isOpen={activeInput === 'guests'}
        onClose={handleClose}
        onSelect={setSelectedGuests}
        selectedLocation={selectedLocation}
        selectedDates={selectedDates}
      />
    </Box>
  );
}
