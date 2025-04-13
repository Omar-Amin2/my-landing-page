'use client'
import { Box, Container, Heading, Text, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { THEME_COLORS } from '@/constants';

export default function CTA() {
  return (
    <Box bg={THEME_COLORS.background} py={10}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={0} alignItems="stretch">
          <GridItem height="400px">
            <Box
              bg="rgb(128, 173, 145)"
              p={12}
              borderRadius="xl"
              borderRightRadius={0}
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Heading 
                as="h2" 
                size="2xl" 
                color="black" 
                mb={6}
                lineHeight="shorter"
              >
                Ready to Book Your
                <br />
                Next Adventure?
              </Heading>
              <Text fontSize="lg" color="black" mb={8}>
                Get exclusive deals and immersive previews with our smart booking platform.
              </Text>
              <Button
                bg="rgb(37, 117, 68)"
                color="white"
                rounded={'full'}
                size="lg"
                px={8}
                transition="all 0.3s ease"
                _hover={{
                  opacity: 0.8,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(37, 117, 68, 0.4)',
                }}
              >
                Book now
              </Button>
            </Box>
          </GridItem>
          <GridItem height="400px">
            <Box 
              borderRadius="xl" 
              borderLeftRadius={0}
              overflow="hidden"
              height="100%"
            >
              <Image
                src="/ctaImage.jpeg"
                alt="Luxury resort view"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
