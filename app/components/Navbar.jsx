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
} from "@chakra-ui/react";
import { NAV_LINKS, AUTH_BUTTONS, COLORS } from "@/constants";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

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

  const renderNavLink = ({ title, hasSearch, prefix }) => (
    <ListItem 
      key={title}
      className={`${hasSearch ? 'flex items-center gap-2' : ''}`}
      _hover={{ color: COLORS.goldHover }}
      cursor="pointer"
    >
      {hasSearch && (
        <IconButton
          icon={<FaSearch size={14} />}
          variant="ghost"
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
          rounded="full"
          size="sm"
        />
      )}
      {prefix && <Text as="span" color={COLORS.bronze}>{prefix}</Text>}
      {title}
    </ListItem>
  );

  return (
    <Box as="nav" bg={COLORS.background} color="white" px={6} py={4}>
      <Flex align="center" width="full">
        {/* Logo Section */}
        <Box w="200px">
          <Image src="/GOE_Icon.png" alt="GOE Icon" width={80} height={80} />
        </Box>

        {/* Navigation Links */}
        <List className="hidden md:flex items-center justify-center gap-10 flex-1">
          {NAV_LINKS.map(renderNavLink)}
        </List>

        {/* Right Section */}
        <Flex align="center" gap={4} w="200px" justify="flex-end">
          <Flex align="center" gap={1} cursor="pointer">
            <Image src="/globe.svg" alt="Language Icon" width={16} height={16} />
            <Text>EN</Text>
          </Flex>
          {loggedIn ? (
            <Button
              bg="gold"
              color="black"
              _hover={{ opacity: 0.9 }}
              size="md"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              {AUTH_BUTTONS.map(({ label, variant }) => (
                <Button
                  key={label}
                  bg="gold"
                  color="black"
                  _hover={{ opacity: 0.9 }}
                  size="md"
                  variant={variant}
                  onClick={label === 'Login' ? handleLogin : handleSignup}
                >
                  {label}
                </Button>
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}