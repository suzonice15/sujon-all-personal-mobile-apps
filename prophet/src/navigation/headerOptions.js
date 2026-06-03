import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PointsBadge from '../components/PointsBadge';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = ({ color }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={() => toggleTheme(!isDark)} style={{ marginRight: 8 }}>
      <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color={color} />
    </TouchableOpacity>
  );
};

export const getHeaderOptions = (colors, { showMenu, navigation, titleFontSize = 17, iconSize = 25 } = {}) => ({
  headerStyle: {
    backgroundColor: colors.headerBackground,
    
    shadowOpacity: 0,               // আইওএস-এর জন্য শ্যডো সরানো
  },
  headerTintColor: colors.headerColor,
  headerTitleStyle: { fontWeight: 'bold', fontSize: titleFontSize },
  headerTitleAlign: 'left',

  headerRight: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ThemeToggleButton color={colors.headerColor} />
      <PointsBadge textColor={colors.headerColor} />
    </View>
  ),
  ...(showMenu && navigation ? {
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 5, paddingRight: 5 }}>
        <MaterialIcons name="menu" size={iconSize} color={colors.headerColor} />
      </TouchableOpacity>
    ),
  } : {}),
});
