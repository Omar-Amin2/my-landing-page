'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Box, Container, Input, VStack, Text, Icon, Flex, IconButton } from '@chakra-ui/react'
import { FaSearch, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { THEME_COLORS } from '../constants'

const popularLocations = [
  { id: 1, name: 'Cairo', region: 'City in Egypt' },
  { id: 2, name: 'Alexandria', region: 'City in Egypt' },
  { id: 3, name: 'Hurghada', region: 'City in Egypt' },
  { id: 4, name: 'Luxor', region: 'City in Egypt' },
  { id: 5, name: 'Sharm El Sheikh', region: 'City in Egypt' },
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const searchBoxRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return popularLocations;
    
    const query = searchQuery.toLowerCase();
    return popularLocations.filter(location => 
      location.name.toLowerCase().startsWith(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(23, 23, 23, 0.95)"
      backdropFilter="blur(4px)"
      zIndex={1000}
    >
      <Box 
        bg="transparent" 
        pt={{ base: 10, md: 20 }}
      >
        <Container 
          maxW={{ base: "95%", md: "container.md" }} 
          position="relative" 
          ref={searchBoxRef}
        >
          <IconButton
            icon={<FaTimes />}
            position="absolute"
            right={0}
            top={-10}
            color="white"
            variant="ghost"
            size="lg"
            onClick={onClose}
            _hover={{ bg: 'whiteAlpha.200' }}
            aria-label="Close search"
          />
          <VStack spacing={{ base: 4, md: 8 }} align="stretch">
            <Flex
              bg="white"
              p={4}
              rounded="full"
              align="center"
              position="relative"
            >
              <Icon as={FaSearch} color="gray.500" boxSize={5} mr={4} />
              <Input 
                variant="unstyled"
                placeholder="Search destinations"
                fontSize="lg"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                color="gray.800"
                _placeholder={{ color: 'gray.400' }}
                textAlign="left"
                w="full"
              />
            </Flex>

            <Box color="white">
              <Text 
                color={THEME_COLORS.bronzeNude} 
                fontSize="lg" 
                fontWeight="medium"
                mb={4}
              >
                {searchQuery ? 'Search results' : 'Most popular'}
              </Text>
              <VStack align="stretch" spacing={6}>
                {filteredLocations.map((location) => (
                  <Flex 
                    key={location.id}
                    align="center"
                    cursor="pointer"
                    _hover={{ color: THEME_COLORS.bronzeNude }}
                    transition="all 0.2s"
                  >
                    <Icon as={FaMapMarkerAlt} mr={3} />
                    <Box>
                      <Text fontSize="lg" fontWeight="medium">
                        {location.name}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {location.region}
                      </Text>
                    </Box>
                  </Flex>
                ))}
                {filteredLocations.length === 0 && (
                  <Text color="gray.400">No destinations found</Text>
                )}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
