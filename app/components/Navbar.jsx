"use client"
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
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
  VStack,
} from "@chakra-ui/react";
import { NAV_LINKS, AUTH_BUTTONS, THEME_COLORS } from '../constants';
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

  const renderNavLink = ({ title, id }) => (
    <ListItem 
      key={id || title}
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
      <Box 
        as="nav" 
        bg={THEME_COLORS.background} 
        color="white"
        position="relative"
        zIndex={2}
        mb={4}  // Add margin bottom
      >
        <Container maxW="container.xl">
          <Flex align="center" py={{ base: 1, md: 2 }}>
            <Box flexBasis={{ base: "120px", md: "200px" }}>
              <Image 
                src="/GOE_Icon.png" 
                alt="GOE Icon" 
                width={80} 
                height={80} 
                style={{ width: 'auto', height: 'auto' }}
              />
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<HamburgerIcon boxSize={6} />}
              variant="ghost"
              color="white"
              onClick={onToggle}
              ml="auto"
              _hover={{ bg: 'whiteAlpha.200' }}
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

            {/* User Actions */}
            <Flex 
              align="center" 
              gap={{ base: 2, md: 4 }} 
              flexBasis={{ base: "auto", md: "200px" }}
              justify="flex-end"
              display={{ base: "none", md: "flex" }}  // Hide on mobile
            >
              {/* Language Selector */}
              <Flex align="center" gap={2}>  
                <Image 
                  src="/globe.svg" 
                  alt="Language" 
                  width={20} 
                  height={20} 
                  style={{ opacity: 0.8, filter: 'brightness(0) invert(1)' }}
                />
                <Text color="white" fontSize="sm">EN</Text>
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
                        fontSize="md"
                        py={3}
                        px={6}
                        color={THEME_COLORS.bronzeNude}
                        _hover={{ bg: 'gray.50' }}
                      >
                        My profile
                      </MenuItem>
                      <MenuItem
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                        _hover={{ bg: 'gray.50' }}
                      >
                        Saved bundles
                      </MenuItem>
                      <MenuItem
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                        _hover={{ bg: 'gray.50' }}
                      >
                        Invite friends
                      </MenuItem>
                      <MenuItem
                        fontSize="md"
                        py={3}
                        px={6}
                        color={"black"}
                        _hover={{ bg: 'gray.50' }}
                      >
                        Settings
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        color="red.500"
                        fontSize="md"
                        py={3}
                        px={6}
                        onClick={handleLogout}
                        _hover={{ bg: 'gray.50' }}
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
                      px={6}
                      py={5}
                      borderRadius="xl"
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

      {/* Mobile Menu Overlay */}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={THEME_COLORS.background}
        zIndex={20}
        p={4}
      >
        <Flex direction="column" h="full">
          {/* Header */}
          <Flex justify="space-between" align="center" mb={8}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                <Text as="span" color={THEME_COLORS.bronzeNude}>Egy</Text>
                <Text as="span" color="white">Book</Text>
              </Text>
            </Box>
            <IconButton
              icon={<CloseIcon />}
              variant="ghost"
              color="white"
              onClick={onToggle}
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          </Flex>

          {/* Menu Items */}
          <VStack spacing={6} align="start" flex={1}>
            {/* Language Selector */}
            <Flex align="center" gap={2}>
              <Image 
                src="/globe.svg" 
                alt="Language" 
                width={24} 
                height={24} 
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <Text color="white" fontSize="lg">EN</Text>
            </Flex>

            {loggedIn ? (
              <>
                <Text color="white" fontSize="lg">Wishlist</Text>
                <Text color="white" fontSize="lg">Cart</Text>
                <Text color={THEME_COLORS.bronzeNude} fontSize="lg">My profile</Text>
                <Text color="white" fontSize="lg">Saved deals</Text>
                <Text color="white" fontSize="lg">Invite friends</Text>
                <Text color="white" fontSize="lg">Settings</Text>
                <Text 
                  color="red.500" 
                  fontSize="lg" 
                  cursor="pointer"
                  onClick={handleLogout}
                  mt={4}
                >
                  Log out
                </Text>
              </>
            ) : (
              <>
                <Button
                  w="full"
                  bg={THEME_COLORS.bronzeNude}
                  color="white"
                  onClick={handleLogin}
                  px={6}
                  py={6}
                  borderRadius="xl"
                >
                  Login
                </Button>
                <Button
                  w="full"
                  variant="outline"
                  borderColor={THEME_COLORS.bronzeNude}
                  color="white"
                  onClick={handleSignup}
                  px={6}
                  py={6}
                  borderRadius="xl"
                >
                  Sign up
                </Button>
              </>
            )}
          </VStack>

          {/* Bottom Logo */}
          <Box mt="auto" alignSelf="center">
            <Image src="/GOE_Icon.png" alt="GOE Icon" width={120} height={120} style={{ opacity: 0.5 }} />
          </Box>
        </Flex>
      </Box>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  );
}