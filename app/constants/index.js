export const NAV_LINKS = [
  { title: 'GOE', hasSearch: true },
  { title: 'EgyBook' },
  { title: 'EgyExplore' },
  { title: 'EgyTales' },
  { title: 'EgyTreasure' }
];

export const AUTH_BUTTONS = [
  { label: 'Login', variant: 'solid', colorScheme: 'yellow' },
  { label: 'Sign up', variant: 'solid', colorScheme: 'yellow' }
];

export const THEME_COLORS = {
  gold: "yellow.400",
  bronze: "#CD7F32",
  bronzeNude: "#E6BE8A",
  background: "#121212",
  hoverText: "whiteAlpha.800"
};

export const SOCIAL_LINKS = [
  { name: 'Instagram', icon: 'FaInstagram', href: '#' },
  { name: 'Facebook', icon: 'FaFacebook', href: '#' },
  { name: 'TikTok', icon: 'FaTiktok', href: '#' },
  { name: 'Twitter', icon: 'FaXTwitter', href: '#' },
  { name: 'LinkedIn', icon: 'FaLinkedin', href: '#' }
];

export const FOOTER_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'EgyBook', href: '/egybook' },
  { title: 'EgyExplore', href: '/egyexplore' },
  { title: 'EgyTales', href: '/egytales' },
  { title: 'EgyTreasure', href: '/egytreasure' }
];

// 8-point grid system
export const space = {
  1: 2,    // 8px
  2: 4,    // 16px
  3: 6,    // 24px
  4: 8,    // 32px
  5: 10,   // 40px
  6: 12,   // 48px
  7: 14,   // 56px
  8: 16,   // 64px
};

export const spacing = {
  section: {
    py: { base: space[4], md: space[6] },     // 32px - 48px
    px: { base: space[2], md: space[3] }      // 16px - 24px
  },
  component: {
    gap: { base: space[2], md: space[3] },    // 16px - 24px
    spacing: { base: space[2], md: space[3] }  // 16px - 24px
  },
  element: {
    gap: { base: space[1], md: space[2] }     // 8px - 16px
  }
};