import { extendTheme } from '@chakra-ui/react'
import { THEME_COLORS } from '@/constants'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: THEME_COLORS.background,
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        transition: 'all 0.2s',
      },
      variants: {
        primary: {
          bg: THEME_COLORS.bronzeNude,
          color: 'white',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            opacity: 0.9,
          },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 6, lg: 8 },
      },
    },
  },
})

export default theme
