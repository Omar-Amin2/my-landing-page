'use client'
import { useState } from 'react'
import { Box, VStack, Text, IconButton, HStack, Button, Divider } from '@chakra-ui/react'
import { FaMinus, FaPlus, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { THEME_COLORS } from '../constants'

export default function GuestPicker({ isOpen, onClose, onSelect, selectedLocation, selectedDates }) {
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  })

  const updateGuests = (type, increment) => {
    setGuests(prev => {
      const newValue = prev[type] + (increment ? 1 : -1)
      const limits = {
        adults: { min: 1, max: 10 },
        children: { min: 0, max: 6 },
        rooms: { min: 1, max: 5 }
      }
      return {
        ...prev,
        [type]: Math.max(limits[type].min, Math.min(limits[type].max, newValue))
      }
    })
  }

  const handleSave = () => {
    onSelect(`${guests.adults} Adults, ${guests.children} Children, ${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`)
    onClose()
  }

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
        maxW="3xl"
        mx="auto"
        mt={20}
        onClick={e => e.stopPropagation()}
      >
        {/* Summary bar */}
        <HStack 
          bg="rgba(45, 45, 45, 0.95)"
          p={4}
          rounded="lg"
          mb={6}
          spacing={8}
        >
          <HStack flex={1}>
            <FaMapMarkerAlt color={THEME_COLORS.bronzeNude} />
            <Text color="white">{selectedLocation || 'Select location'}</Text>
          </HStack>
          <HStack flex={1}>
            <FaCalendarAlt color={THEME_COLORS.bronzeNude} />
            <Text color="white">{selectedDates || 'Add dates'}</Text>
          </HStack>
          <Button
            bg={THEME_COLORS.bronzeNude}
            color="white"
            px={6}
            onClick={handleSave}
            _hover={{ opacity: 0.9 }}
          >
            Apply
          </Button>
        </HStack>

        {/* Guest picker */}
        <Box 
          bg="rgba(45, 45, 45, 0.95)"
          p={6}
          rounded="lg"
        >
          <VStack spacing={6} align="stretch">
            {[
              { type: 'adults', label: 'Adults', subtitle: 'Age 18 or above' },
              { type: 'children', label: 'Children', subtitle: 'Under 18' },
              { type: 'rooms', label: 'Rooms', subtitle: 'Number of rooms' }
            ].map(({ type, label, subtitle }) => (
              <HStack key={type} justify="space-between" py={2}>
                <VStack align="start" spacing={1}>
                  <Text color="white" fontWeight="medium">{label}</Text>
                  <Text color="gray.400" fontSize="sm">{subtitle}</Text>
                </VStack>
                <HStack spacing={4}>
                  <IconButton
                    icon={<FaMinus />}
                    onClick={() => updateGuests(type, false)}
                    isDisabled={guests[type] <= (type === 'adults' || type === 'rooms' ? 1 : 0)}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  />
                  <Text color="white" fontWeight="medium" minW="8" textAlign="center">
                    {guests[type]}
                  </Text>
                  <IconButton
                    icon={<FaPlus />}
                    onClick={() => updateGuests(type, true)}
                    isDisabled={guests[type] >= (type === 'children' ? 6 : 10)}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}
