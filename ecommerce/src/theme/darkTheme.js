import { MD3DarkTheme } from 'react-native-paper';
import { colors } from './colors';

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,    
    success: colors.success,
    danger: colors.danger,
    circleBackground:"#fff",
    circleText:"#1e293b",
    background: '#000000',
    surface: '#1e293b',
    text: '#ffffff',
    onSurface: '#ffffff',
      headerBackground:"#000000",
    headerColor:"#F9FAFB",
  },
};