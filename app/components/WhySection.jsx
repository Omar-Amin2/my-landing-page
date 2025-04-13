'use client'
import { Box, Container, Heading, SimpleGrid, Text, Icon, VStack } from '@chakra-ui/react';
import { FaMousePointer, FaVrCardboard, FaPiggyBank } from 'react-icons/fa';
import { THEME_COLORS } from '@/constants';

const features = [
  {
    title: ['Seamless', 'Smart', 'Booking'],
    icon: FaMousePointer,
    color: '#64A67C',
    description: 'Quick, user-friendly platform that simplifies the reservation process'
  },
  {
    title: ['Immersive', 'VR', 'Previews'],
    icon: FaVrCardboard,
    color: '#64A67C',
    description: 'Explore hotels and rooms in 360° before you book—giving you total confidence.'
  },
  {
    title: ['Exclusive', 'Best-Price', 'Deals'],
    icon: FaPiggyBank,
    color: '#64A67C',
    description: 'Save more with special offers and real-time price comparisons.'
  }
];

export default function WhySection() {
  return (
    <Box py={10} bg={THEME_COLORS.background}>
      <Container maxW="container.xl">
        <Heading 
          mb={16} 
          textAlign= "left"
          size="2xl"
          color="white"
        >
          Why choose <Text as="span" color={THEME_COLORS.bronzeNude}>Egy</Text>Book?
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {features.map((feature, index) => (
            <VStack 
              key={index} 
              spacing={4} 
              align="center"
            >
              <Icon 
                as={feature.icon} 
                boxSize={12} 
                color={feature.color}
              />
              <Heading 
                size="lg" 
                textAlign="center"
                color="white"
              >
                <Text as="span" color={feature.color}>{feature.title[0]} </Text>
                {feature.title[1] === 'VR' ? (
                  <Text as="span" color={feature.color}>{feature.title[1]} </Text>
                ) : (
                  <Text as="span" color="white">{feature.title[1]} </Text>
                )}
                <Text as="span" color="white">{feature.title[2]}</Text>
              </Heading>
              <Text
                textAlign="center"
                color="gray.400"
                fontSize="lg"
              >
                {feature.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
