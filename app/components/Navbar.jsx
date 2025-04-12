"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  IconButton,
  Text,
  useColorModeValue,
  Container,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { NAV_LINKS, AUTH_BUTTONS, THEME_COLORS } from "@/constants";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSignup = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    const rootElement = document.getElementById('__next');
    if (rootElement) {
      rootElement.removeAttribute('pwa-launched');
      rootElement.removeAttribute('pwa-extension-id');
      rootElement.removeAttribute('pwa-extension-url-root');
    }
  }, []);

  const renderNavLink = ({ title, hasSearch }) => (
    <ListItem 
      key={title}
      display="flex"
      alignItems="center"
      gap={2}
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ opacity: 0.6 }}
      color={hasSearch ? THEME_COLORS.bronzeNude : "white"}  // Make GOE text bronzeNude
    >
      {hasSearch ? (
        <>
          <IconButton
            icon={<FaSearch />}
            variant="ghost"
            bg="#242424"  // Slightly lighter than background
            color={THEME_COLORS.bronzeNude}  // Make icon bronzeNude
            _hover={{ bg: "#2a2a2a" }}
            rounded="full"
            size="sm"
          />
          <Text>{title}</Text>
        </>
      ) : (
        <Text>
          <Text as="span" color={THEME_COLORS.bronzeNude}>
            {title.slice(0, 3)}
          </Text>
          <Text as="span" color="white">
            {title.slice(3)}
          </Text>
        </Text>
      )}
    </ListItem>
  );

  return (
    <Box as="nav" bg={THEME_COLORS.background} color="white" boxShadow="md">
      <Container maxW="container.xl">
        <Flex align="center" py={4}>
          <Box flexBasis="200px">
            <Image src="/GOE_Icon.png" alt="GOE Icon" width={80} height={80} />
          </Box>

          <List
            display={{ base: "none", md: "flex" }}
            align="center"
            justify="center"
            gap={10}
            flex={1}
          >
            {NAV_LINKS.map(renderNavLink)}
          </List>

          <Flex align="center" gap={4} flexBasis="200px" justify="flex-end">
            <Flex
              align="center"
              gap={1}
              cursor="pointer"
            >
              <Image src="/globe.svg" alt="Language Icon" width={16} height={16} />
              <Text fontSize="sm">EN</Text>
            </Flex>
            {loggedIn ? (
              <Button
                bg={THEME_COLORS.bronzeNude}
                color="white"
                onClick={handleLogout}
                size="md"
                _hover={{ transform: "translateY(-2px)", opacity: 0.9 }}
                transition="all 0.3s ease"
              >
                Logout
              </Button>
            ) : (
              <>
                {AUTH_BUTTONS.map(({ label, variant}) => (
                  <Button
                    key={label}
                    variant={variant}
                    bg={THEME_COLORS.bronzeNude}
                    color="white"
                    onClick={label === 'Login' ? handleLogin : handleSignup}
                    size="md"
                    _hover={{ transform: "translateY(-2px)", opacity: 0.9 }}
                    transition="all 0.3s ease"
                  >
                    {label}
                  </Button>
                ))}
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}