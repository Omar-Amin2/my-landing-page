"use client"
import { Box, Container, Flex, Text, HStack, VStack, Link, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SOCIAL_LINKS, FOOTER_LINKS, THEME_COLORS } from '@/constants';

const iconMap = {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaTwitter,
  FaLinkedin,
};

export default function Footer() {
  return (
    <Box bg={THEME_COLORS.background} color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={10}>
          {/* Logo and Description */}
          <Box>
            <Image src="/GOE_Icon.png" alt="GOE Logo" width={150} height={80} />
            <Text fontSize="3xl" maxW="800px" textAlign="center" mt={4}>
              Lorem, Ipsum Lorem, Ipsum Lorem, Ipsum or less.
            </Text>
          </Box>

          {/* Discover More Button */}
          <Link
            px={6}
            py={2}
            bg="gold"
            color="black"
            borderRadius="md"
            _hover={{ opacity: 0.9 }}
          >
            Discover More
          </Link>

          {/* Navigation Links */}
          <HStack spacing={8} color="gold">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                fontSize="lg"
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
                color={link.title.includes('Egy') ? 'gold' : 'white'}
              >
                {link.title}
              </Link>
            ))}
          </HStack>

          {/* Social Media Icons */}
          <HStack spacing={6}>
            {SOCIAL_LINKS.map((social) => (
              <Link 
                key={social.name} 
                href={social.href}
                _hover={{ color: THEME_COLORS.gold }}
                transition="all 0.3s ease"
              >
                <Icon 
                  as={iconMap[social.icon]} 
                  boxSize={6} 
                  color={THEME_COLORS.bronze}
                />
              </Link>
            ))}
          </HStack>

          {/* Copyright */}
          <Text textAlign="center" opacity={0.8}>
            Copyright Gates of Egypt © {new Date().getFullYear()}
            <br />
            All rights reserved
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
