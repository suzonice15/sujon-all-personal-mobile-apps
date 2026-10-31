import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser, logoutUser } from '../db/auth';
import { subscribe } from '../utils/events';
import { apps_title, developer_id, published_app_slug } from '../config/url';

const menu = [
  // History and Shop have no bottom tab; they are also on the Dashboard menu.
  { title: 'Shop', icon: 'shopping-bag', screen: 'ProductList', tab: 'ProductList' },
  { title: 'History', icon: 'history', screen: 'HistoryMain', tab: 'History' },
  { title: 'Claim Earned Coins', icon: 'card-giftcard', screen: 'Claim', tab: 'Home' },
  { title: 'Watch Ads, Earn Coins', icon: 'play-circle-outline', screen: 'AdEarn', tab: 'Home' },
  { title: 'Collect Daily Coins', icon: 'today', screen: 'DailyCoin', tab: 'Home' },
  { title: 'Bookmarks', icon: 'bookmark', screen: 'Bookmarks' },
  { title: 'About the App', icon: 'info-outline', screen: 'AboutApps', tab: 'Home' },
  // { title: 'Support Us', icon: 'volunteer-activism', screen: 'Donation', tab: 'Home' },
  { title: 'About the Developer', icon: 'person-outline', screen: 'AboutDeveloper', tab: 'Home' },
  { title: 'Share the App', icon: 'share', action: 'share' },
  { title: 'Rate the App', icon: 'star-border', action: 'rate' },
  { title: 'Contact Us', icon: 'feedback', screen: 'Feedback', tab: 'Home' },
  { title: 'Privacy Policy', icon: 'lock-outline', screen: 'Privacy', tab: 'Home' },
  { title: 'More Apps', icon: 'apps', action: 'moreApps' },
  { title: 'Settings', icon: 'settings', screen: 'SettingInfo', tab: 'Home' },
];

export default function DrawerMenuScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => {
    let mounted = true;
    const load = () => getLoggedInUser().then((u) => { if (mounted) setUser(u); }).catch(() => {});
    load();
    const unsub = subscribe('authChanged', load);
    return () => { mounted = false; unsub(); };
  }, []);

  const handlePress = async (item) => {
    if (item.screen) {
      navigation.closeDrawer();
      const params = item.tab
        ? { screen: item.tab, params: { screen: item.screen } }
        : { screen: item.screen };
      navigation.navigate('Main', params);
    } else if (item.action === 'share') {
      await Share.share({
  message: `${apps_title}
Download the app:
https://play.google.com/store/apps/details?id=${published_app_slug}${
    user?.referral_code
      ? `\n\nReferral code: ${user.referral_code}`
      : ""
  }`,
});
    } else if (item.action === 'rate') {
      Linking.openURL(`market://details?id=${published_app_slug}`);
    } else if (item.action === 'moreApps') {
      Linking.openURL(`https://play.google.com/store/apps/developer?id=${developer_id}`);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to log out?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: async () => { await logoutUser(); setUser(null); ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT); } },
    ]);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View style={s.avatarBox}>
          {user ? <Text style={s.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="person" size={28} color={colors.primary} />}
        </View>
        <Text style={s.userName}>{user ? user.name : 'Guest User'}</Text>
        <Text style={s.userEmail}>{user ? user.email : 'Log In'}</Text>
      </View>

      <View style={s.menuContainer}>
        {menu.map((item, index) => (
          <TouchableOpacity key={index} style={s.menuItem} onPress={() => handlePress(item)}>
            <MaterialIcons name={item.icon} size={20} color={colors.text} />
            <Text style={s.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.menuItem} onPress={user ? handleLogout : () => navigation.navigate('Main', { screen: 'Profile' })}>
          <MaterialIcons name={user ? 'logout' : 'login'} size={20} color={user ? colors.danger : colors.text} />
          <Text style={[s.menuText, { color: user ? colors.danger : colors.text }]}>
            {user ? 'Logout' : 'Login / Register'}
          </Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingTop: 60, paddingBottom: 30, alignItems: 'center',
    backgroundColor: colors.headerBackground,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  avatarBox: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.background,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: colors.headerColor },
  userName: { fontSize: 17, fontWeight: '700', color: colors.headerColor },
  userEmail: { fontSize: 12, color: colors.headerColor, marginTop: 2 },
  menuContainer: { paddingHorizontal: 20, paddingTop: 15 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: colors.surface,
  },
  menuText: { marginLeft: 16, fontSize: 14, color: colors.text, fontWeight: '500' },
  footer: { textAlign: 'center', color: colors.text, fontSize: 11, marginVertical: 20, opacity: 0.4 },
});
