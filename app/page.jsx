'use client'

import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Navbar from "./components/Navbar.jsx";
import WhySection from "./components/WhySection.jsx";
import DiscoverSection from "./components/DiscoverSection.jsx";
import CTA from "./components/CTA.jsx";
import MostRelevantSection from "./components/MostRelevantSection.jsx";
import Trending from "./components/Trending.jsx";
import { Box } from '@chakra-ui/react';
import { THEME_COLORS } from './constants';

export default function Home() {
  return (
    <Box 
      as="main" 
      minH="100vh" 
      display="flex" 
      flexDirection="column" 
      gap={4} 
      pb={4} 
      position="relative"
      maxW="100vw"
      overflow="hidden" 
    >
      <Navbar />
      <HeroSection />
      <MostRelevantSection />
      <DiscoverSection />
      <WhySection /> 
      <Trending />
      <CTA />
      <Footer />
    </Box>
  );
}
