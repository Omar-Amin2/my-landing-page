'use client'
import { useState, useEffect } from 'react'
import { Box, HStack, Text, IconButton, Grid, Button, Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import { FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa'
import { THEME_COLORS } from '@/constants'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DatePicker({ isOpen, onClose, onSelect, selectedLocation, selectedGuests }) {
  const today = new Date(); // Get current date
  const [currentDate] = useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDateClick = (date) => {
    if (date < today) return; // Prevent selecting past dates
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      } else {
        setSelectedEndDate(date)
      }
    }
  }

  const handleSave = () => {
    if (selectedStartDate && selectedEndDate) {
      const formattedDates = `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
      onSelect(formattedDates);
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && selectedStartDate && selectedEndDate) {
      handleSave();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedStartDate, selectedEndDate]);

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isSelected = selectedStartDate && date.getTime() === selectedStartDate.getTime()
      const isInRange = selectedStartDate && selectedEndDate && 
        date >= selectedStartDate && date <= selectedEndDate
      
      days.push(
        <Button
          key={day}
          size="sm"
          variant="ghost"
          bg={isSelected ? THEME_COLORS.bronzeNude : isInRange ? `${THEME_COLORS.bronzeNude}30` : 'transparent'}
          color={isSelected ? 'white' : 'gray.200'}
          _hover={{ bg: `${THEME_COLORS.bronzeNude}50` }}
          onClick={() => handleDateClick(date)}
          isDisabled={date < today} // Disable past dates
        >
          {day}
        </Button>
      )
    }

    return days
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
        mt={{ base: 4, md: 20 }}
        p={{ base: 3, md: 6 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search bar summary */}
        <HStack 
          bg="rgba(45, 45, 45, 0.95)"
          p={{ base: 3, md: 4 }}
          rounded="lg"
          mb={{ base: 4, md: 6 }}
          spacing={{ base: 3, md: 8 }}
          flexDir={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
        >
          <HStack flex={1}>
            <FaMapMarkerAlt color={THEME_COLORS.bronzeNude} size={16} />
            <Text color="white" fontSize={{ base: "sm", md: "md" }} noOfLines={1}>{selectedLocation || 'Select location'}</Text>
          </HStack>
          <HStack flex={1}>
            <FaCalendarAlt color={THEME_COLORS.bronzeNude} size={16} />
            <Text color="white" fontSize={{ base: "sm", md: "md" }} noOfLines={1}>
              {selectedStartDate ? `${formatDate(selectedStartDate)}${selectedEndDate ? ` - ${formatDate(selectedEndDate)}` : ''}` : 'Add dates'}
            </Text>
          </HStack>
          <HStack flex={1}>
            <FaUsers color={THEME_COLORS.bronzeNude} size={16} />
            <Text color="white" fontSize={{ base: "sm", md: "md" }} noOfLines={1}>{selectedGuests || 'Add guests'}</Text>
          </HStack>
          <Button
            bg={THEME_COLORS.bronzeNude}
            color="white"
            px={{ base: 4, md: 6 }}
            py={{ base: 2, md: 3 }}
            w={{ base: "full", md: "auto" }}
            fontSize={{ base: "sm", md: "md" }}
            onClick={handleSave}
            isDisabled={!selectedStartDate || !selectedEndDate}
            _hover={{ opacity: 0.9 }}
          >
            Press Enter to Apply
          </Button>
        </HStack>

        {/* Calendar */}
        <Box bg="rgba(45, 45, 45, 0.95)" p={6} rounded="lg">
          <HStack justify="space-between" mb={6}>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11)
                  setCurrentYear(prev => prev - 1)
                } else {
                  setCurrentMonth(prev => prev - 1)
                }
              }}
              variant="ghost"
              color="white"
            />
            <Text color="white" fontSize="xl">
              {months[currentMonth]} {currentYear}
            </Text>
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0)
                  setCurrentYear(prev => prev + 1)
                } else {
                  setCurrentMonth(prev => prev + 1)
                }
              }}
              variant="ghost"
              color="white"
            />
          </HStack>

          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {days.map(day => (
              <Text 
                key={day} 
                color="gray.400" 
                fontSize="sm" 
                textAlign="center"
                mb={2}
              >
                {day}
              </Text>
            ))}
            {renderCalendar()}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
