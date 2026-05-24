import { MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';

export const lightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: colors.primary,
    secondary: colors.secondary,

    background: '#ffffff',
    surface: '#f9fafb',

    text: colors.text,
    onSurface: colors.text,

    success: colors.success,
    danger: colors.danger,
  },
};