import {DefaultTheme} from 'styled-components/native';
import {baseTokens} from '../tokens';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F5F7FA',
    primary: '#1E88E5',
    primaryContrast: '#FFFFFF',
    secondary: '#00ACC1',
    secondaryContrast: '#FFFFFF',
    text: '#1A1C1E',
    textMuted: '#5F6368',
    border: '#DDE2EB',
    success: '#2E7D32',
    warning: '#F9A825',
    danger: '#C62828',
  },
  ...baseTokens,
};
