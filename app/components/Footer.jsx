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
      py={{ base: 12, md: 8 }}
      position="relative"
    >
      <Container maxW="container.xl" position="relative" px={{ base: 6, md: 4 }}>
        <Flex direction="column" gap={{ base: 10, md: 8 }}>
          {/* Top Section */}
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            justify="space-between" 
            align={{ base: 'center', md: 'flex-end' }}
            gap={{ base: 8, md: 0 }}
          >
            <VStack align={{ base: "center", md: "start" }} spacing={6} flex={1}>
              <Image 
                src="/GOE_Icon2.png" 
                alt="GOE Logo" 
                width={150} 
                height={80} 
                style={{ width: 'auto', height: 'auto' }}
              />
              <Text 
                fontSize={{ base: "xl", md: "3xl" }} 
                maxW="400px"
                textAlign={{ base: "center", md: "left" }}
              >
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

            <HStack 
              spacing={3} 
              mb={{ base: 0, md: 1 }}
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
              justify={{ base: 'center', md: 'flex-start' }}
            >
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

          {/* Bottom Section */}
          <VStack spacing={{ base: 6, md: 8 }} align="center" pt={4}>
            <Flex 
              gap={{ base: 4, md: 8 }}
              direction={{ base: 'column', md: 'row' }}
              align="center"
              textAlign="center"
            >
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  fontSize={{ base: "md", md: "lg" }}
                  _hover={{ textDecoration: 'none', opacity: 0.6 }}
                  color="white"
                >
                  {renderLinkText(link.title)}
                </Link>
              ))}
            </Flex>

            <Text 
              textAlign="center" 
              opacity={0.8}
              fontSize={{ base: "sm", md: "md" }}
            >
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
