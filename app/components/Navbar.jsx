"use client"
import Image from "next/image";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  IconButton,
  Text,
  Icon,
  useColorModeValue,
  Container,
  useDisclosure,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { NAV_LINKS, AUTH_BUTTONS, THEME_COLORS } from "@/constants";
import { useAuth } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const { loggedIn, setLoggedIn } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();

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

  const renderNavLink = ({ title }) => (
    <ListItem 
      key={title}
      display="flex"
      alignItems="center"
      gap={2}
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ opacity: 0.6 }}
      color="white"
    >
      <Text>
        <Text as="span" color={THEME_COLORS.bronzeNude}>
          {title.slice(0, 3)}
        </Text>
        <Text as="span" color="white">
          {title.slice(3)}
        </Text>
      </Text>
    </ListItem>
  );

  return (
    <>
      <Box as="nav" bg={THEME_COLORS.background} color="white">
        <Container maxW="container.xl">
          <Flex align="center" py={{ base: 2, md: 4 }}>
            <Box flexBasis={{ base: "120px", md: "200px" }}>
              <Image src="/GOE_Icon.png" alt="GOE Icon" width={60} height={60} />
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<HamburgerIcon />}
              variant="ghost"
              color="white"
              onClick={onToggle}
              ml="auto"
              mr={2}
            />

            {/* Desktop Navigation */}
            <List
              display={{ base: "none", md: "flex" }}
              align="center"
              justify="center"
              gap={{ md: 6, lg: 10 }}
              flex={1}
            >
              <IconButton
                icon={<FaSearch />}
                variant="ghost"
                bg="#242424"
                color={THEME_COLORS.bronzeNude}
                _hover={{ bg: "#2a2a2a" }}
                rounded="full"
                size="md"
                onClick={onSearchOpen}
              />
              {NAV_LINKS.map(renderNavLink)}
            </List>

            {/* Mobile Navigation */}
            <Collapse in={isOpen} animateOpacity>
              <Box
                display={{ base: 'flex', md: 'none' }}
                flexDirection="column"
                bg={THEME_COLORS.background}
                position="absolute"
                top="100%"
                left={0}
                right={0}
                p={4}
                zIndex={2}
              >
                {NAV_LINKS.map(({ title }) => (
                  <Text 
                    key={title}
                    py={2}
                    color="white"
                    _hover={{ color: THEME_COLORS.bronzeNude }}
                  >
                    {title}
                  </Text>
                ))}
              </Box>
            </Collapse>

            {/* User Actions */}
            <Flex 
              align="center" 
              gap={{ base: 2, md: 4 }} 
              flexBasis={{ base: "auto", md: "200px" }}
              justify="flex-end"
            >
              <Flex align="center" gap={3}>  
                <Image src="/globe.svg" alt="Language Icon" width={24} height={24} />
                <Text fontSize="lg" fontWeight="medium">EN</Text>
              </Flex>
              
              {loggedIn && (
                <Flex align="center" gap={5}> 
                  <Text 
                    color="gray.500" 
                    fontSize="xl" 
                    mx={3}  
                    opacity={0.7}
                  >
                  </Text>
                  <Icon
                    as={FiHeart}
                    boxSize={6}
                    color={THEME_COLORS.bronzeNude}
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                  />
                  <Icon
                    as={FiShoppingCart}
                    boxSize={6}
                    color={THEME_COLORS.bronzeNude}
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                  />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiUser size="1.5em" />}
                      variant="ghost"
                      bg="#242424"
                      color={THEME_COLORS.bronzeNude}
                      _hover={{ bg: "#2a2a2a" }}
                      rounded="full"
                      size="md"
                    />
                    <MenuList
                      bg="white"
                      borderRadius="xl"
                      py={2}
                      shadow="xl"
                      border="none"
                    >
                      <MenuItem
                        className="hover:bg-gray-50"
                        fontSize="md"
                        py={3}
                        px={6}
                        color={THEME_COLORS.bronzeNude}
                      >
                        My profile
                      </MenuItem>
                      <MenuItem
                        className="hover:bg-gray-50"
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                      >
                        Saved bundles
                      </MenuItem>
                      <MenuItem
                        className="hover:bg-gray-50"
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                      >
                        Invite friends
                      </MenuItem>
                      <MenuItem
                        className="hover:bg-gray-50"
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                      >
                        Settings
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        className="hover:bg-gray-50"
                        color="red.500"
                        fontSize="md"
                        py={3}
                        px={6}
                        onClick={handleLogout}
                      >
                        Log out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}

              {!loggedIn && (
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
      <SearchOverlay isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  );
}