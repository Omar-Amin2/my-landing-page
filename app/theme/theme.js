import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from '@/constants';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: THEME_COLORS.background,
        color: 'white'
      }
    }
  }
});

export default theme;
