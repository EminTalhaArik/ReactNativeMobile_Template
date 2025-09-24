import {DefaultTheme} from 'styled-components/native';

export type ColorScheme = 'light' | 'dark';

export const baseTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    round: 999,
  },
  typography: {
    fontFamily: 'System',
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      display: 32,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  elevation: {
    sm: 2,
    md: 6,
    lg: 12,
  },
  zIndex: {
    base: 0,
    dropdown: 10,
    modal: 100,
    toast: 1000,
  },
};

export type ThemeMode = DefaultTheme;
