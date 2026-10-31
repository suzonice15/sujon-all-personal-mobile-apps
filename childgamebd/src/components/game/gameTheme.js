import { Platform } from 'react-native';

// Design tokens shared by all kids' games (warm wood + cream + bright accents).
export const GC = {
  ink: '#4A2C17',
  inkSoft: '#7A5A43',
  cream: '#FFF8EC',
  creamDeep: '#FBEBD0',
  creamBorder: '#F0D9B5',
  wood: '#E2A85F',
  woodLight: '#F7D9A4',
  woodDark: '#9A6431',
  red: '#F0384F',
  redDark: '#C51F3A',
  blue: '#2F80ED',
  blueDark: '#1F5FBF',
  green: '#2BB673',
  greenDark: '#1E8E58',
  yellow: '#FFC531',
  orange: '#FF8A3D',
  stone: '#D5D8DB',
  stoneDark: '#9EA3A8',
  white: '#FFFFFF',
};

export const shadow = (elevation = 6, color = '#5A3A1A') =>
  Platform.select({
    android: { elevation },
    default: {
      shadowColor: color,
      shadowOpacity: 0.18,
      shadowRadius: elevation,
      shadowOffset: { width: 0, height: elevation / 2 },
    },
  });
