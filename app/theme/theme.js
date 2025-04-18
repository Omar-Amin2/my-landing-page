import { extendTheme } from '@chakra-ui/react'
import { THEME_COLORS } from '../constants'

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
    IconButton: {
      baseStyle: {
        borderRadius: 'full',
        transition: 'all 0.2s',
      },
      variants: {
        ghost: {
          _hover: {
            bg: 'whiteAlpha.200',
          }
        },
        solid: {
          bg: THEME_COLORS.bronzeNude,
          color: 'white',
          _hover: {
            opacity: 0.9,
            transform: 'translateY(-1px)',
          }
        }
      }
    },
    Box: {
      baseStyle: {
        borderRadius: 'xl'
      }
    },
    Text: {
      variants: {
        heading: {
          color: 'white',
          fontWeight: 'bold'
        },
        body: {
          color: 'gray.400'
        }
      }
    },
    Link: {
      baseStyle: {
        transition: 'all 0.2s',
        _hover: {
          textDecoration: 'none',
          opacity: 0.8
        }
      }
    }
  }
})

export default theme
