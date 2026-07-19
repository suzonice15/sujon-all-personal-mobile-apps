import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Linking, Alert, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser, logoutUser } from '../db/auth';
import { apps_title, developer_id, published_app_slug } from '../config/url';

const menu = [
  { title: 'অর্জিত কয়েন গ্রহণ করুন', icon: 'card-giftcard', screen: 'Claim', tab: 'Home' },
  { title: 'বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন', icon: 'play-circle-outline', screen: 'AdEarn', tab: 'Home' },
  { title: 'দৈনিক কয়েন সংগ্রহ করুন', icon: 'today', screen: 'DailyCoin', tab: 'Home' },
  { title: 'বুকমার্ক', icon: 'bookmark', screen: 'Bookmarks' },
  { title: 'অ্যাপ সম্পর্কে', icon: 'info-outline', screen: 'AboutApps', tab: 'Home' },
  // { title: 'সহযোগিতা করুন', icon: 'volunteer-activism', screen: 'Donation', tab: 'Home' },
  { title: 'ডেভেলপার সম্পর্কে', icon: 'person-outline', screen: 'AboutDeveloper', tab: 'Home' },
  { title: 'অ্যাপ শেয়ার করুন', icon: 'share', action: 'share' },
  { title: 'অ্যাপ রেটিং দিন', icon: 'star-border', action: 'rate' },
  { title: 'যোগাযোগ করুন', icon: 'feedback', screen: 'Feedback', tab: 'Home' },
  { title: 'প্রাইভেসি পলিসি', icon: 'lock-outline', screen: 'Privacy', tab: 'Home' },
  { title: 'আরো অ্যাপ', icon: 'apps', action: 'moreApps' },
  { title: 'সেটিংস', icon: 'settings', screen: 'SettingInfo', tab: 'Home' },
];

export default function DrawerMenuScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => {
    getLoggedInUser().then(setUser);
  }, []);

  useEffect(() => {
    const unsub = navigation.getParent()?.addListener('state', () => {
      getLoggedInUser().then(setUser);
    });
    return unsub;
  }, [navigation]);

  const handlePress = async (item) => {
    if (item.screen) {
      navigation.closeDrawer();
      const params = item.tab
        ? { screen: item.tab, params: { screen: item.screen } }
        : { screen: item.screen };
      navigation.navigate('Home', params);
    } else if (item.action === 'share') {
      await Share.share({
  message: `${apps_title}
অ্যাপটি ডাউনলোড করুন:
https://play.google.com/store/apps/details?id=${published_app_slug}${
    user?.referral_code
      ? `\n\nরেফারেল কোড: ${user.referral_code}`
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
    Alert.alert('লগআউট', 'আপনি কি লগআউট করতে চান?', [
      { text: 'না', style: 'cancel' },
      { text: 'হ্যাঁ', onPress: async () => { await logoutUser(); setUser(null); ToastAndroid.show('লগআউট সফল হয়েছে', ToastAndroid.SHORT); } },
    ]);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View style={s.avatarBox}>
          {user ? <Text style={s.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
            : <MaterialIcons name="person" size={28} color={colors.primary} />}
        </View>
        <Text style={s.userName}>{user ? user.name : 'অতিথি ব্যবহারকারী'}</Text>
        <Text style={s.userEmail}>{user ? user.email : 'লগইন করুন'}</Text>
      </View>

      <View style={s.menuContainer}>
        {menu.map((item, index) => (
          <TouchableOpacity key={index} style={s.menuItem} onPress={() => handlePress(item)}>
            <MaterialIcons name={item.icon} size={20} color={colors.text} />
            <Text style={s.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.menuItem} onPress={user ? handleLogout : () => navigation.navigate('Home', { screen: 'Profile' })}>
          <MaterialIcons name={user ? 'logout' : 'login'} size={20} color={user ? colors.danger : colors.text} />
          <Text style={[s.menuText, { color: user ? colors.danger : colors.text }]}>
            {user ? 'লগআউট' : 'লগইন / নিবন্ধন'}
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
