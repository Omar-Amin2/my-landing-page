import { extendTheme } from '@chakra-ui/react'
import { THEME_COLORS } from '@/constants'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: THEME_COLORS.background,
        color: 'white',
      }
    }
  },
  colors: {
    bronzeNude: THEME_COLORS.bronzeNude,
    green: {
      500: '#64A67C',
      600: '#558B69',
    }
  },
})
