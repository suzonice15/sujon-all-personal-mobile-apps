import { MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';

export const lightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    onSurface: colors.text,
    success: colors.success,
    danger: colors.danger,    
    background: '#f1f1f1',
    surface: '#ffffff',
    circleBackground:"#ddd",
    circleText:"#374151",    
    text: "#374151",
    headerBackground:"#000000",
    headerColor:"#ffffff",
  },
};