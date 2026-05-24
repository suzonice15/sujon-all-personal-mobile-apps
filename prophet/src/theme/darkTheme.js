import { MD3DarkTheme } from 'react-native-paper';
import { colors } from './colors';

export const darkTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: colors.primary,
    secondary: colors.secondary,

    background: '#0f172a',
    surface: '#1e293b',

    text: '#ffffff',
    onSurface: '#ffffff',

    success: colors.success,
    danger: colors.danger,
  },
};