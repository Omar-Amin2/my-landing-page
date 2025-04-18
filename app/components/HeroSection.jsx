'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Box, Container, Heading, Text, Button, Stack, HStack, Input, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaLocationArrow } from 'react-icons/fa';
import { THEME_COLORS } from '../constants';
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
      height={{ base: "85vh", md: "67vh" }}
      maxHeight={{ base: "800px", md: "800px" }}
      width="100%" 
      overflow="hidden"
      mb={{ base: 2, md: 4 }}  
      mt={{ base: "-1", md: "-8" }}  
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
      <Container maxW="container.xl" h="full" position="relative" zIndex={1}>
        <Stack
          spacing={{ base: 4, md: 6 }}
          position="relative"
          top="50%"
          transform="translateY(-50%)"
          px={{ base: 4, md: 0 }}
          color="white"
          maxW="5xl"
          mx="auto"
        >
          <Box mb={{ base: 3, md: 4 }}>
            <HStack spacing={2} mb={{ base: 3, md: 2 }}>
              <Icon as={FaLocationArrow} color="white" boxSize={{ base: 3, md: 4 }} />
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">Egypt</Text>
            </HStack>
            <Heading 
              as="h1" 
              fontSize={{ base: "2xl", md: "5xl" }}
              fontWeight="bold" 
              mb={{ base: 2, md: 4 }}
              lineHeight="shorter"
            >
              {loggedIn ? 'Hey, Omar!' : 'Hey!'}
            </Heading>
            <Heading 
              as="h2" 
              fontSize={{ base: "xl", md: "5xl" }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Tell us where you want to stay
            </Heading>
          </Box>
          <Text 
            fontSize={{ base: "lg", md: "2xl" }} 
            mb={{ base: 3, md: 5 }}
            display={{ base: "none", md: "block" }}
          >
            Book 450+ Curated Egyptian Hotels
          </Text>

          <HStack 
            spacing={{ base: 4, md: 4 }} 
            p={{ base: 4, md: 6 }}
            flexDir={{ base: "column", md: "row" }}
            alignItems="stretch"
            bg="rgba(32, 32, 32, 0.85)"
            backdropFilter="blur(12px)"
            borderRadius={{ base: "2xl", md: "full" }}
            border={`1px solid ${THEME_COLORS.bronzeNude}`}
            color="white"
            width="100%"
            boxShadow="dark-lg"
            mt={{ base: 3, md: 6 }}
          >
            {['location', 'dates', 'guests'].map((input) => (
              <HStack 
                key={input}
                flex={1} 
                cursor="pointer"
                p={{ base: 4, md: 0 }}
                bg={{ base: 'whiteAlpha.200', md: 'transparent' }}
                rounded={{ base: '2xl', md: 'none' }}
                onClick={() => setActiveInput(input)}
                transition="all 0.2s"
                _hover={{ bg: { base: 'whiteAlpha.300', md: 'transparent' } }}
                borderBottom={{ base: '1px solid', md: 'none' }}
                borderColor={{ base: 'whiteAlpha.200', md: 'transparent' }}
                _last={{ borderBottom: 'none' }}
              >
                <Icon 
                  as={
                    input === 'location' ? FaMapMarkerAlt : 
                    input === 'dates' ? FaCalendarAlt : 
                    FaUsers
                  } 
                  color={THEME_COLORS.bronzeNude} 
                  boxSize={{ base: 5, md: 5 }}
                  ml={{ base: 2, md: 0 }}
                />
                <Input 
                  placeholder={
                    input === 'location' ? "Where are you going?" : 
                    input === 'dates' ? "Add dates" : 
                    "Add guests"
                  }
                  value={
                    input === 'location' ? selectedLocation : 
                    input === 'dates' ? selectedDates : 
                    selectedGuests
                  }
                  readOnly
                  cursor="pointer"
                  variant="unstyled" 
                  color="white" 
                  _placeholder={{ color: 'gray.300' }} 
                  fontSize={{ base: "md", md: "md" }}
                  fontWeight="medium"
                />
              </HStack>
            ))}
            <Button 
              bg={THEME_COLORS.bronzeNude}
              color="white"
              size={{ base: "lg", md: "md" }}
              px={{ base: 8, md: 8 }}
              py={{ base: 7, md: 6 }}
              w={{ base: "full", md: "auto" }}
              borderRadius="full"
              _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
              transition="all 0.2s"
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
        allowInvalidDates={false}
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
