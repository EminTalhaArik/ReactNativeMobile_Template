import {DefaultTheme} from 'styled-components/native';
import {baseTokens} from '../tokens';

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#0F141A',
    surface: '#1F2933',
    primary: '#64B5F6',
    primaryContrast: '#0F141A',
    secondary: '#26C6DA',
    secondaryContrast: '#0F141A',
    text: '#E8EAED',
    textMuted: '#AEB8C2',
    border: '#2E3A46',
    success: '#66BB6A',
    warning: '#FFCA28',
    danger: '#EF5350',
  },
  ...baseTokens,
};
