"use client"
import { Box, Container, Flex, Text, HStack, VStack, Link, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTiktok, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { SOCIAL_LINKS, FOOTER_LINKS, THEME_COLORS } from '@/constants';

const iconMap = {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaXTwitter,
  FaLinkedin,
};

export default function Footer() {
  const renderLinkText = (title) => {
    if (title.includes('Egy')) {
      return (
        <>
          <Text as="span" color={THEME_COLORS.bronzeNude}>Egy</Text>
          {title.slice(3)}
        </>
      );
    }
    return title;
  };

  return (
    <Box 
      bg={THEME_COLORS.background} 
      color="white" 
      py={8}
      position="relative"
    >
      <Container maxW="container.xl" position="relative">
        <Flex direction="column" gap={8}>
          {/* Top Section */}
          <Flex justify="space-between" align="flex-end">  {/* Changed align to flex-end */}
            {/* Left Column - Logo, Text, and Button */}
            <VStack align="start" spacing={6} flex={1}>
              <Image src="/GOE_Icon.png" alt="GOE Logo" width={150} height={80} />
              <Text fontSize="3xl" maxW="400px">
                Lorem, Ipsum Lorem, Ipsum Lorem, Ipsum or less.
              </Text>
              <Link
                px={8}
                py={3}
                bg={THEME_COLORS.bronzeNude}
                color="white"
                borderRadius="full"
                _hover={{ opacity: 0.9 }}
                fontSize="md"
                fontWeight="medium"
              >
                Discover More
              </Link>
            </VStack>

            {/* Right Column - Social Icons */}
            <HStack spacing={3} mb={1}>  {/* Replaced mt with mb for fine-tuning */}
              {SOCIAL_LINKS.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  px={1}
                  py={1}
                  bg={THEME_COLORS.bronzeNude}
                  borderRadius="lg"
                  _hover={{ transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  <Icon 
                    as={iconMap[social.icon]} 
                    boxSize={10} 
                    color="white"
                  />
                </Link>
              ))}
            </HStack>
          </Flex>

          {/* Bottom Section - Navigation and Copyright */}
          <VStack spacing={8} align="center" pt={4}>
            <HStack spacing={8}>
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  fontSize="lg"
                  _hover={{ textDecoration: 'none', opacity: 0.6 }}
                  color="white"
                >
                  {renderLinkText(link.title)}
                </Link>
              ))}
            </HStack>

            <Text textAlign="center" opacity={0.8}>
              Copyright Gates of Egypt © {new Date().getFullYear()}
              <br />
              All rights reserved
            </Text>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
