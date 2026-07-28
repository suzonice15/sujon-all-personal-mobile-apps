import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from './NotificationBell';

export default function AppHeader({ navigation, colors, showMenu, title }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { backgroundColor: colors.headerBackground, paddingTop: insets.top + 6 }]}>
      <View style={s.row}>
        {showMenu && navigation && (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={s.menuBtn}>
            <MaterialIcons name="menu" size={30} color={colors.headerColor} />
          </TouchableOpacity>
        )}

        <View style={s.center}>
          {title ? (
            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
              <MaterialIcons name="arrow-back" size={28} color={colors.headerColor} />
            </TouchableOpacity>
          ) : null}
          {title ? (
            <Text style={[s.titleText, { color: colors.headerColor }]} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <Image
              source={require('../assets/images/logo.png')}
              style={s.logo}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={s.right}>
          <TouchableOpacity
            style={s.iconBtn}
            onPress={() => navigation.navigate('SearchProduct')}
          >
            <MaterialIcons name="search" size={30} color={colors.headerColor} />
          </TouchableOpacity>
          <NotificationBell color={colors.headerColor} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingBottom: 6,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBtn: {
    padding: 8,
    marginRight: 8,
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  logo: {
    height: 40,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
    marginRight: 6,
  },
});
