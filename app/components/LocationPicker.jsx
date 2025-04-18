'use client'
import { useState, useMemo } from 'react'
import { Box, VStack, Input, Icon, Text, Flex, HStack, Button } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaSearch, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { THEME_COLORS } from '../constants'

const locations = [
  { id: 1, name: 'Cairo', region: 'City in Egypt' },
  { id: 2, name: 'Hurghada', region: 'City in Egypt' },
  { id: 3, name: 'Sharm El-Sheikh', region: 'City in Egypt' },
  { id: 4, name: 'Luxor & Aswan', region: 'City in Egypt' },
]

export default function LocationPicker({ isOpen, onClose, onSelect, selectedDates, selectedGuests }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLocations = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return locations.filter(location => 
      location.name.toLowerCase().includes(query)
    )
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(23, 23, 23, 0.95)"
      backdropFilter="blur(4px)"
      zIndex={1000}
      onClick={onClose}
    >
      <Box 
        position="relative"
        maxW="container.md"
        mx="auto"
        mt={20}
        p={6}
        onClick={e => e.stopPropagation()}
      >
        <HStack 
          bg="rgba(45, 45, 45, 0.95)"
          p={4}
          rounded="lg"
          mb={6}
          spacing={8}
        >
          <HStack flex={1}>
            <FaCalendarAlt color={THEME_COLORS.bronzeNude} />
            <Text color="white">{selectedDates || 'Add dates'}</Text>
          </HStack>
          <HStack flex={1}>
            <FaUsers color={THEME_COLORS.bronzeNude} />
            <Text color="white">{selectedGuests || 'Add guests'}</Text>
          </HStack>
          <Button
            bg={THEME_COLORS.bronzeNude}
            color="white"
            px={6}
            _hover={{ opacity: 0.9 }}
          >
            Continue
          </Button>
        </HStack>

        <Flex
          bg="rgba(45, 45, 45, 0.95)"
          p={4}
          rounded="lg"
          align="center"
          mb={6}
        >
          <Icon as={FaSearch} color="gray.400" boxSize={5} mr={4} />
          <Input 
            variant="unstyled"
            placeholder="Start typing to search destinations..."
            color="white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            _placeholder={{ color: 'gray.400' }}
            autoFocus
          />
        </Flex>

        <VStack spacing={2} align="stretch">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <Flex
                key={location.id}
                bg="rgba(45, 45, 45, 0.95)"
                p={4}
                rounded="lg"
                align="center"
                cursor="pointer"
                onClick={() => {
                  onSelect(location.name)
                  onClose()
                }}
                _hover={{ bg: 'rgba(55, 55, 55, 0.95)' }}
              >
                <Icon as={FaMapMarkerAlt} color={THEME_COLORS.bronzeNude} boxSize={5} mr={4} />
                <Box>
                  <Text color="white" fontWeight="medium">{location.name}</Text>
                  <Text color="gray.400" fontSize="sm">{location.region}</Text>
                </Box>
              </Flex>
            ))
          ) : (
            <Flex
              bg="rgba(45, 45, 45, 0.95)"
              p={8}
              rounded="lg"
              align="center"
              justify="center"
              direction="column"
            >
              <Text color="gray.400" fontSize="lg" mb={2}>No destinations found</Text>
              <Text color="gray.500" fontSize="sm">Try searching for another location</Text>
            </Flex>
          )}
        </VStack>
      </Box>
    </Box>
  )
}
