import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      primary: string;
      primaryContrast: string;
      secondary: string;
      secondaryContrast: string;
      text: string;
      textMuted: string;
      border: string;
      success: string;
      warning: string;
      danger: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    radius: {
      sm: number;
      md: number;
      lg: number;
      round: number;
    };
    typography: {
      fontFamily: string;
      sizes: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        display: number;
      };
      lineHeights: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    elevation: {
      sm: number;
      md: number;
      lg: number;
    };
    zIndex: {
      base: number;
      dropdown: number;
      modal: number;
      toast: number;
    };
  }
}
